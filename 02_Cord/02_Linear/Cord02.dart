/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class Cord02
{
  Element container;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  
  int particleNum;
  
  final int maxParticles = 50;
  final num gravity = 1;
  final num airFriction = .97;
  final num ground = 600;
  
  num wind;
  
  Cord02() 
  {
    
  }

  void run() 
  {
    wind = .0;
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

    window.setInterval(f() => spawnParticle(), (1000/5).toInt());
    window.setInterval(f() => moveParticles(), (1000/30).toInt());
  }
  
  void onDocumentMouseMove( MouseEvent event )
  {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  
  void spawnParticle()
  {   
    num mag = Math.random()*10;
    num dir = Math.random()*Math.PI*2;
    
    particles['p $particleNum'] = new Particle( mouseX, mouseY, Math.cos(dir)*mag, Math.sin(dir)*mag);
    
    particleNum ++;
    
    if ( particleNum > maxParticles ) {
      // Delete the particle object
      int currParticle = particleNum - maxParticles;
      particles.remove('p $currParticle');
    }
  }
  
  void moveParticles()
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    //if (Math.random()<.05) wind = Math.random() * 2 - 1;
    
    for ( var key in particles.getKeys() ) 
    {
      // Step Particles
      Particle p = particles[key];
      p.xSpeed += wind;
      p.ySpeed += gravity;
      
      p.xSpeed *= airFriction;
      p.ySpeed *= airFriction;
      
      p.x += p.xSpeed;
      p.y += p.ySpeed;
      
      if (p.y > ground) {
        p.y = ground;
        p.ySpeed *= -1;
      }      
      
      // Render Particles
      context.fillStyle = 'rgba( 255, 255, 255, 1 )';
      context.beginPath();
      context.arc( p.x, p.y, 10, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();
      
      context.fillStyle = 'rgba( 50, 50, 50, 1 )';
      context.beginPath();
      context.arc( p.x, p.y, 8, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();  
    }
    
    // Render Lines
    context.beginPath();
    
    num min = particleNum - maxParticles;
    if ( min < 1 ) min = 1;
    
    for ( int c = particleNum-1; c >= min + 1; c-- )
    {
      Particle p = particles['p $c'];

      if ( c == particleNum-1 ) {
        context.moveTo(p.x, p.y);
      } else {
        context.lineTo(p.x, p.y);
      }
    }
    
    context.lineWidth = 1;
    context.strokeStyle = "#ffffff";
    context.stroke();
  }
}

void main() {
  new Cord02().run();
}


class Particle 
{  
  num x, y, xSpeed, ySpeed, midPointX, midPointY;
  
  Particle( num this.x, num this.y, num this.xSpeed, num this.ySpeed )
  { 
  }
}




