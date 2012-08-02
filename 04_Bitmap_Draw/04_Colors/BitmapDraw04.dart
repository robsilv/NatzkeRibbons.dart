/**
 * @author Rob Silverton / http://www.unwrong.com/
 *
 * Ported to Dart from Erik Natzke's original work in Flash:
 *
 * @author Erik Natzke / http://blog.natzke.com/
 * Flash source: http://natzke.com/source/
 */


#import('dart:html');

class BitmapDraw04
{
  Element container;
  CanvasElement canvas;
  CanvasElement imgCanvas;
  CanvasRenderingContext2D context;
  CanvasRenderingContext2D imgContext;
  ImageElement image;
  
  int mouseX;
  int mouseY;
  
  Map particles;
  
  int particleNum;
  
  final int maxParticles = 25;
  final int maxDistance = 100; 
  final num gravity = .5;
  final num airFriction = .97;
  final int ground = 600;
  
  num wind;
  
  BitmapDraw04() 
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
    
    imgCanvas = new Element.tag('canvas');
    imgCanvas.width = window.innerWidth;
    imgCanvas.height = window.innerHeight;      
    //container.nodes.add( imgCanvas );
    
    imgContext = imgCanvas.getContext( '2d' );
    
    
    image = new Element.tag('img');
    image.src = "Bitmap1.png";
    image.on.load.add(imageLoaded);
    //container.nodes.add( image );
    
    document.on.mouseMove.add(onDocumentMouseMove);

    window.setInterval(f() => spawnParticle(), (1000/10).toInt());
    window.setInterval(f() => step(), (1000/30).toInt());
    window.setInterval(f() => render(), (1000/100).toInt());
  }
  
  void imageLoaded( Event event )
  {
    CanvasPattern pattern = imgContext.createPattern(image, 'repeat');
    imgContext.fillStyle = pattern;
    imgContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
  
    //image.remove();
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
    
    ImageData imgData = imgContext.getImageData(mouseX, mouseY, 1, 1);
    Uint8ClampedArray pixels = imgData.data;
    //color = new Color([data[0], data[1], data[2]]);
    //print('color under mouse R ${pixels[0]} G ${pixels[1]} B ${pixels[2]}');
    
    int color = rgbToHex(pixels[0], pixels[1], pixels[2]);

    particles['p $particleNum'] = new Particle( mouseX, mouseY, Math.cos(dir)*mag, Math.sin(dir)*mag, 0, color);
    
    if ( particleNum > maxParticles ) {
      // Delete the particle object
      int currParticle = particleNum - maxParticles;
      particles.remove('p $currParticle');
    }
    
    particleNum ++;
  }
  
  void step()
  {
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
  }
  
  void render()
  {
    //context.clearRect(0, 0, canvas.width, canvas.height);

    int min = particleNum - maxParticles;
    if ( min < 0 ) min = 0;
    
    // Render Ribbon
    for ( int c = particleNum-1; c > min; c-- )
    {  
      Particle p = particles['p $c'];
      Particle nb = particles['p ${c+1}'];
      Particle nbB = particles['p ${c-1}'];
     
      if ( c == particleNum-1 ) {
        context.moveTo(p.x, p.y);
      } else if (c>min+1) {
        
        Point2D point_a = new Point2D(nbB.x+nbB.radius*Math.cos(nbB.angle + Math.PI*.5), nbB.y+nbB.radius*Math.sin(nbB.angle + Math.PI*.5));
        Point2D point_b = new Point2D(nbB.x-nbB.radius*Math.cos(nbB.angle + Math.PI*.5), nbB.y-nbB.radius*Math.sin(nbB.angle + Math.PI*.5));
        
        
        Point2D point_c = new Point2D(p.x+p.radius*Math.cos(p.angle + Math.PI*.5), p.y+p.radius*Math.sin(p.angle + Math.PI*.5));
        Point2D point_d = new Point2D(p.x-p.radius*Math.cos(p.angle + Math.PI*.5), p.y-p.radius*Math.sin(p.angle + Math.PI*.5));
        
        Point2D point_e = new Point2D(nb.x+nb.radius*Math.cos(nb.angle + Math.PI*.5), nb.y+nb.radius*Math.sin(nb.angle + Math.PI*.5));
        Point2D point_f = new Point2D(nb.x-nb.radius*Math.cos(nb.angle + Math.PI*.5), nb.y-nb.radius*Math.sin(nb.angle + Math.PI*.5));

        
        Point2D point_ac = new Point2D(point_a.x+(point_c.x-point_a.x)*.5, point_a.y+(point_c.y-point_a.y)*.5);
        Point2D point_ce = new Point2D(point_c.x+(point_e.x-point_c.x)*.5, point_c.y+(point_e.y-point_c.y)*.5);
        
        Point2D point_bd = new Point2D(point_b.x+(point_d.x-point_b.x)*.5, point_b.y+(point_d.y-point_b.y)*.5);
        Point2D point_df = new Point2D(point_d.x+(point_f.x-point_d.x)*.5, point_d.y+(point_f.y-point_d.y)*.5);       
  
        List rgb = hexToRGB(p.color);
        
        // Draw Ribbon Segment
        context.beginPath();
        context.fillStyle = 'rgba( ${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .25 )';
        
        context.moveTo(point_bd.x, point_bd.y);
        context.quadraticCurveTo(point_d.x, point_d.y, point_df.x, point_df.y);

        context.lineTo(point_ce.x, point_ce.y);
        context.quadraticCurveTo(point_c.x, point_c.y, point_ac.x, point_ac.y);
        
        context.lineTo(point_bd.x, point_bd.y);
        
        context.fill();
        
        rgb = hexToRGB( 0x222222 );
        
        context.lineWidth = 1;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = 'rgba( ${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0 )';
       
        context.stroke();
        
        // Draw Ribbon Outlines
        context.beginPath();
        
        context.moveTo(point_bd.x, point_bd.y);
        context.quadraticCurveTo(point_d.x, point_d.y, point_df.x, point_df.y);

        context.moveTo(point_ce.x, point_ce.y);
        context.quadraticCurveTo(point_c.x, point_c.y, point_ac.x, point_ac.y);

        rgb = hexToRGB( 0x222222 );
        
        context.lineWidth = 1;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = 'rgba( ${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1 )';
       
        context.stroke();       
      }
    }
  }
  
  List hexToRGB( num hex )
  {
    hex = hex.floor();

    int r = ( hex >> 16 & 255 );
    int g = ( hex >> 8 & 255 );
    int b = ( hex & 255 );

    return [r,g,b];
  }
  
  num rgbToHex(int r, int g, int b)
  {
    num h = (r<<16)^(g<<8)^(b);
    return h;
  }
}

void main() {
  new BitmapDraw04().run();
}


class Particle 
{  
  num x, y, xSpeed, ySpeed, radius, color;
  num angle = 0;
  num midPointX = 0;
  num midPointY = 0;
  num midPointXB = 0;
  num midPointYB = 0;
  num distance = 0;
  
  Particle( num this.x, num this.y, [num this.xSpeed = 0, num this.ySpeed = 0, num this.radius = 0, this.color = 0xFFFFFF] )
  { 
  }
}

class Point2D
{
  num x, y;
  
  Point2D( [this.x = 0, this.y = 0] )
  {
    
  }
}


