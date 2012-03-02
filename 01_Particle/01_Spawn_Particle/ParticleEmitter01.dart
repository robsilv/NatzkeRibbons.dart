/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class ParticleEmitter01 
{
  Element container;
  CanvasRenderingContext2D context;
  
  int mouseX;
  int mouseY;
  
  ParticleEmitter01() 
  {
    
  }

  void run() 
  {
    mouseX = 0;
    mouseY = 0;
    
    container = new Element.tag('div');
    document.body.nodes.add( container );
    
    CanvasElement canvas = new Element.tag('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.nodes.add( canvas );
    
    context = canvas.getContext( '2d' );
    
    document.on.mouseMove.add(onDocumentMouseMove);

    window.setInterval(f() => spawnParticle(), 50);
  }
  
  void onDocumentMouseMove( MouseEvent event )
  {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  
  void spawnParticle()
  {
    // Render Particle
    context.fillStyle = 'rgba( 255, 255, 255, 1 )';
    context.beginPath();
    context.arc( mouseX, mouseY, 10, 0, Math.PI * 2, false );
    context.closePath();
    context.fill();
  }
}

void main() {
  new ParticleEmitter01().run();
}
