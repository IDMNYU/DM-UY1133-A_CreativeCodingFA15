
var thestring = 'FF+F--FFF+FF-F-F--FF+';
var stringpos = 0;

var x, y, r, g, b, a;
var currentangle = 270; // face north
var step = 20; // how far do i draw?
var angle = 45; // how much do i turn?
var radius; // how big is a circle?

function setup()
{
  createCanvas(800, 600);
  background(255);  // white
  stroke(0, 0, 0, 255); // black
  
  // start your 'turtle' in the middle:
  x = width/2;
  y = height/2;
}

function draw()
{
  // give me some random color:
  r = random(128, 255);
  g = random(0, 192);
  b = random(0, 50);
  a = random(50, 100);

  // gaussian (bell) curve for the radius:
  radius = 0;
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius = radius/3.;
  
  // draw the stuff
  fill(r, g, b, a); // interior fill color
  ellipse(x, y, radius, radius); // circle that chases the mouse

  driveturtle(thestring.charAt(stringpos)); // draw the current character
  stringpos = (stringpos+1) % thestring.length; // increment the current character
  
}

function keyTyped()
{
  driveturtle(key);
}

function driveturtle(k)
{
  if(k=='F')
   {
      var x1 = x + step*cos(radians(currentangle));
      var y1 = y + step*sin(radians(currentangle));
      line(x, y, x1, y1);
      x = x1;
      y = y1;
   }
   else if(k=='+')
   {
     currentangle+=angle;
   }
   else if(k=='-')
   {
     currentangle-=angle;     
   }
  
}

