/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class Cord05
{
  Element container;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  
  int particleNum;
  
  final int maxParticles = 25;
  final int maxDistance = 100; 
  final num gravity = 1;
  final num airFriction = .97;
  final num ground = 600;
  
  num wind;
  
  Cord05() 
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
   
    particles['p $particleNum'] = new Particle( mouseX, mouseY, Math.cos(dir)*mag, Math.sin(dir)*mag, 0);
    
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
      Particle nb = particles['p ${c-1}'];
      
      p.xSpeed += wind;
      p.ySpeed += gravity;
      
      p.xSpeed *= airFriction;
      p.ySpeed *= airFriction;
      
      p.x += p.xSpeed;
      p.y += p.ySpeed;
      
      if (c > particleNum - maxParticles * .5) {
        p.radius += .5;
      } else {
        p.radius *= .95;
      }
      
      if ( p.y > ground ) {
        p.y = ground;
        p.ySpeed *= -1;
      }
      
      num X = p.x - nb.x;
      num Y = p.y - nb.y;
      
      num Distance = Math.sqrt(X*X+Y*Y);
      num Angle = Math.atan2(Y, X);
      
      if ( Distance > maxDistance ) {
        p.x = nb.x + maxDistance * Math.cos(Angle);
        p.y = nb.y + maxDistance * Math.sin(Angle);
      }
    }
    
    // RENDER
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Render Lines
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      Particle nb = particles['p ${c-1}'];
      
      context.beginPath();
      context.lineWidth = p.radius;
      
      if ( c == particleNum-1 ) {
        context.moveTo(p.x, p.y);
      } else {
        context.moveTo(nb.x, nb.y);
        context.lineTo(p.x, p.y);
      }
      
      context.lineJoin = "round";
      context.lineCap = "round";
      context.strokeStyle = "#ffffff";
      context.stroke();          
    }
    
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
  }
}

void main() {
  new Cord05().run();
}


class Particle 
{  
  num x, y, xSpeed, ySpeed, radius, midPointX, midPointY;
  
  Particle( num this.x, num this.y, num this.xSpeed, num this.ySpeed, num this.radius )
  { 
  }
}


