//
// turtle2 -> does a "Hilbert" curve and draws it
//

// TURTLE STUFF:
var x, y; // the current position of the turtle
var currentangle = 0; // which way the turtle is pointing
var step = 20; // how much the turtle moves with each 'F'
var angle = 60; // how much the turtle turns with a '-' or '+'
var whereinstring = 0; // where in the L-system are we drawing right now?

// GRAPHICS STUFF;
var r, g, b, a; // some color shit
var radius; // width of circle

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'F'; // "axiom" or start of the string
var numloops = 3; // how many iterations of the L-system to pre-compute

// THIS RUNS WHEN WE HIT GO
function setup()
{
  createCanvas(800, 600); // this is the size of the window
  background(255); // background to white
  stroke(0, 0, 0, 255); // draw in black
  
  // start the x and y position at lower-left corner
  x = width/2;
  y = height/2;
  
  // COMPUTE THE L-SYSTEM
  
  println(thestring);
  for(var i = 0;i<numloops;i++) {
    thestring = lindenmayer(thestring); // do the stuff to make the string
      println(thestring);
  }
  
}

// DO THIS EVERY FRAME
function draw()
{
  
  // draw the current character in the string:
  drawIt(thestring.charAt(whereinstring)); 
  
  // increment the point for where we're reading the string
  whereinstring++;
  if(whereinstring>thestring.length-1) whereinstring = 0;

}

// interpret an L-system
function lindenmayer(s)
{
  var outputstring = ''; // start a blank output string
  
  // go through the string, doing rewriting as we go
  for(var i=0;i<s.length;i++)
  {
    if(s.charAt(i)=='F')
    {
       outputstring+="F+F−F−F+F";
    }
    else
    {
       outputstring+= s.charAt(i); 
    }

  }
  
  return(outputstring); // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(k)
{
   if(k=='F') // draw forward
   {
     var x1 = x + step*cos(radians(currentangle));
     var y1 = y + step*sin(radians(currentangle));
     line(x, y, x1, y1); // draw the line
     x = x1;
     y = y1;
     /*
     if(x>width-1) x=0;
     if(x<0) x=width-1;
     if(y>height-1) y=0;
     if(y<0) y=height-1;
     */
   }
   else if(k=='+') // turn right
   {
     currentangle+=angle;
   }
   else if(k=='-') // turn left
   {
     currentangle-=angle;     
   }
   
   
  // draw the other crazy stuff:
  
  // give me some random values
  r = random(128, 255);
  g = random(0, 192);
  b = random(0, 50);
  a = random(50, 100);

  radius = 0;
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius = radius/3.;
  // draw the stuff
  fill(r, g, b, a); // interior fill color
  ellipse(x, y, radius, radius); // circle that chases the mouse

}

