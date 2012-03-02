/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class ParticleEmitter02 
{
  Element container;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  int particleNum;
  
  ParticleEmitter02() 
  {
    
  }

  void run() 
  {
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

    window.setInterval(f() => spawnParticle(), 30);
    window.setInterval(f() => moveParticles(), 10);
  }
  
  void onDocumentMouseMove( MouseEvent event )
  {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  
  void spawnParticle()
  {
    particleNum ++;
    
    particles['p $particleNum'] = {'x':mouseX, 'y':mouseY,
                                   'xSpeed':Math.random()*4-2, 'ySpeed':Math.random()*4-2};
  }
  
  void moveParticles()
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for ( var key in particles.getKeys() ) 
    {
      // Step Particle
      Map p = particles[key];
      p['x'] += p['xSpeed'];
      p['y'] += p['ySpeed'];
      
      // Render Particle
      context.fillStyle = 'rgba( 255, 255, 255, 1 )';
      context.beginPath();
      context.arc( p['x'], p['y'], 10, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();
      
      context.fillStyle = 'rgba( 50, 50, 50, 1 )';
      context.beginPath();
      context.arc( p['x'], p['y'], 8, 0, Math.PI * 2, false );
      context.closePath();
      context.fill();
    }
  }
}

void main() {
  new ParticleEmitter02().run();
}
