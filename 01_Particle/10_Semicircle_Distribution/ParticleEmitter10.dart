/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class ParticleEmitter10
{
  Element container;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  
  int particleNum;
  
  final int maxParticles = 250;
  final num gravity = 0;
  final num airFriction = .97;
  final int ground = 600;
  
  num wind;
  
  ParticleEmitter10() 
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

    window.setInterval(f() => spawnParticle(), 20);
    window.setInterval(f() => moveParticles(), 20);
  }
  
  void onDocumentMouseMove( MouseEvent event )
  {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  
  void spawnParticle()
  {
    particleNum ++;
    
    num mag = 10;
    num dir = Math.random()*Math.PI;
    
    particles['p $particleNum'] = new Particle( mouseX, mouseY, Math.cos(dir)*mag, Math.sin(dir)*mag);
    
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
      // Step Particle
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

      // Render Particle
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
  }
}

void main() {
  new ParticleEmitter10().run();
}


class Particle
{
  num x, y, xSpeed, ySpeed;
  
  Particle( num this.x, num this.y, num this.xSpeed, num this.ySpeed )
  {
  }
}






