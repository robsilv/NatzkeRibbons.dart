/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class Ribbon15
{
  Element container;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  
  int particleNum;
  
  final int maxParticles = 200;
  final int maxDistance = 100; 
  final num gravity = .5;
  final num airFriction = .97;
  final int ground = 600;
  
  num wind;
  
  Ribbon15() 
  {
    
  }

  void run() 
  {    
    wind = 0;
    mouseX = 0;
    mouseY = 0;
    
    particleNum = 0;
    particles = {};
    
    container = new Element.tag('div');
    document.body.nodes.add( container );
    
    canvas = new Element.tag('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.nodes.add( canvas );
    
    context = canvas.getContext( '2d' );
    
    document.on.mouseMove.add(onDocumentMouseMove);

    window.setInterval(f() => spawnParticle(), (1000/10).toInt());
    window.setInterval(f() => moveParticles(), (1000/30).toInt());
  }
  
  void onDocumentMouseMove( MouseEvent event )
  {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  
  void spawnParticle()
  {
    num mag = Math.random()*2;
    num dir = Math.random()*Math.PI*2;

    particles['p $particleNum'] = new Particle( mouseX, mouseY, Math.cos(dir)*mag, Math.sin(dir)*mag, 0, 0xFFFFFF);
    
    if ( particleNum > maxParticles ) {
      // Delete the particle object
      int currParticle = particleNum - maxParticles;
      particles.remove('p $currParticle');
    }
    
    particleNum ++;
  }
  
  void moveParticles()
  {
    // STEP
    //if (Math.random()<.05) wind = Math.random() * 2 - 1;
    
    int min = particleNum - maxParticles;
    if ( min < 0 ) min = 0;
    
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      Particle nb = particles['p ${c+1}'];
      Particle nbB = particles['p ${c-1}'];
      
      if ( nb === null ) nb = new Particle(mouseX,mouseY);
      
      p.xSpeed += wind;
      p.ySpeed += gravity;
      
      p.xSpeed *= airFriction;
      p.ySpeed *= airFriction;
      
      p.x += p.xSpeed;
      p.y += p.ySpeed;
      
      if (c<min+5) {
        p.x -= (p.x - nb.x)*.6;
        p.y -= (p.y - nb.y)*.6;
      }
      
      if (c > particleNum - maxParticles * .5) {
        p.radius += 1.5;
      } else {
        p.radius *= .85;
      }
      
      if ( p.y > ground ) {
        p.y = ground;
        p.ySpeed *= -1;
      }
      
      num X = p.x - nb.x;
      num Y = p.y - nb.y;
      
      p.distance = Math.sqrt(X*X+Y*Y);
      p.angle = Math.atan2(Y, X);
      
      if ( p.distance > maxDistance ) {
        num oldX = p.x;
        num oldY = p.y;
        
        p.x = nb.x + maxDistance * Math.cos(p.angle);
        p.y = nb.y + maxDistance * Math.sin(p.angle);
        
        p.xSpeed += (p.x-oldX) * .1;
        p.ySpeed += (p.y-oldY) * .1;
      }
      
      p.midPointX = p.x + (nb.x-p.x)*.5;
      p.midPointY = p.y + (nb.y-p.y)*.5;
      
      p.midPointXB = p.x + (nbB.x-p.x)*.5;
      p.midPointYB = p.y + (nbB.y-p.y)*.5;
    }
    
    // RENDER
    context.clearRect(0, 0, canvas.width, canvas.height);
    /*
    // Render Ribbon Lines
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      Particle nb = particles['p ${c+1}'];
      
      context.beginPath();
      context.lineWidth = 1;
      
      if ( c == particleNum-1 ) {
        context.moveTo(p.x, p.y);
      } else {
        context.moveTo(nb.midPointX, nb.midPointY);
        context.quadraticCurveTo(nb.x, nb.y, p.midPointX, p.midPointY);
      }
      
      context.lineJoin = "round";
      context.lineCap = "round";
      context.strokeStyle = "#999999";
      context.stroke();     
    }
    */
    
    // Render Ribbon
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      Particle nb = particles['p ${c+1}'];
      Particle nbB = particles['p ${c-1}'];
     
      if ( c == particleNum-1 ) {
        context.moveTo(p.x, p.y);
      } else if (c>min+1) {
        
        Point point_a = new Point(nbB.x+nbB.radius*Math.cos(nbB.angle + Math.PI*.5), nbB.y+nbB.radius*Math.sin(nbB.angle + Math.PI*.5));
        Point point_b = new Point(nbB.x-nbB.radius*Math.cos(nbB.angle + Math.PI*.5), nbB.y-nbB.radius*Math.sin(nbB.angle + Math.PI*.5));
        
        
        Point point_c = new Point(p.x+p.radius*Math.cos(p.angle + Math.PI*.5), p.y+p.radius*Math.sin(p.angle + Math.PI*.5));
        Point point_d = new Point(p.x-p.radius*Math.cos(p.angle + Math.PI*.5), p.y-p.radius*Math.sin(p.angle + Math.PI*.5));
        
        Point point_e = new Point(nb.x+nb.radius*Math.cos(nb.angle + Math.PI*.5), nb.y+nb.radius*Math.sin(nb.angle + Math.PI*.5));
        Point point_f = new Point(nb.x-nb.radius*Math.cos(nb.angle + Math.PI*.5), nb.y-nb.radius*Math.sin(nb.angle + Math.PI*.5));

        
        Point point_ac = new Point(point_a.x+(point_c.x-point_a.x)*.5, point_a.y+(point_c.y-point_a.y)*.5);
        Point point_ce = new Point(point_c.x+(point_e.x-point_c.x)*.5, point_c.y+(point_e.y-point_c.y)*.5);
        
        Point point_bd = new Point(point_b.x+(point_d.x-point_b.x)*.5, point_b.y+(point_d.y-point_b.y)*.5);
        Point point_df = new Point(point_d.x+(point_f.x-point_d.x)*.5, point_d.y+(point_f.y-point_d.y)*.5);       
  
        List rgb = hexToRGB(p.color);
        
        context.beginPath();
        context.lineWidth = 1;
        context.fillStyle = 'rgba( ${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .25 )';
        
        context.moveTo(point_bd.x, point_bd.y);
        context.quadraticCurveTo(point_d.x, point_d.y, point_df.x, point_df.y);
        
        context.lineTo(point_ce.x, point_ce.y);
        context.quadraticCurveTo(point_c.x, point_c.y, point_ac.x, point_ac.y);
        
        context.lineTo(point_bd.x, point_bd.y);
        
        context.fill();
        
        // End here, so it will pick up here.
        //context.moveTo(p.midPointX, p.midPointY);
        
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = p.color.toInt().toRadixString(16);
        context.stroke();
      }  
    }

    /*
    // Render Particles
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      
      context.fillStyle = 'rgba( 255, 255, 255, 1 )';
      context.beginPath();
      context.arc( p.x, p.y, 6, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();
      
      context.fillStyle = 'rgba( 50, 50, 50, 1 )';
      context.beginPath();
      context.arc( p.x, p.y, 5, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();
    }
    */
  }
  
  List hexToRGB( num hex )
  {
    hex = hex.floor();

    int r = ( hex >> 16 & 255 );
    int g = ( hex >> 8 & 255 );
    int b = ( hex & 255 );

    return [r,g,b];
  }
}

void main() {
  new Ribbon15().run();
}


class Particle 
{  
  num x, y, xSpeed, ySpeed, radius, angle,
  midPointX, midPointY, midPointXB, midPointYB, distance, color;
  
  Particle( num this.x, num this.y, [num this.xSpeed = 0, num this.ySpeed = 0, num this.radius = 0, this.color = 0xFFFFFF] )
  { 
  }
}



