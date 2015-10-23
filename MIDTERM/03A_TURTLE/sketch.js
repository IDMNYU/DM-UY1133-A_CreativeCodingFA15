// TURTLE GRAPHICS
// https://en.wikipedia.org/wiki/Turtle_graphics
// 
// this p5 sketch does a simple implementation of Seymour Papert's
// 'turtle graphics' package for LOGO.  using key commands, you can
// drive a turtle as it draws on the screen.
// 
// your tasks:
// (1) make the drawing system that the turtle drives around
// more interesting.  you can change the way lines work; you
// can have it plop down images instead of shapes; you can 
// have it set vertex points for shapes.
// (2) expand the turtle's vocabulary so it understands more 
// symbols than +, -, and F.  for example, a standard turtle
// typically will use lowercase 'f' for a move that *doesn't*
// draw (e.g. to leave a space).  it will also allow for branching
// symbols such as '[' and ']' so that the turtle can go on an
// expedition and 'teleport' back when a branch closes.  a simple
// thought would be to have the 'C' key change the turtle's drawing
// color.
// (3) find a way to make the turtle draw *automatically*, using
// the same system.  see the next sketch for an example of how that
// might be done.  :)

var x, y; // some variables for the current position of the turtle
var currentangle = 270; // we start out facing north
var step = 20; // how many pixels do we move forward when we draw?
var angle = 45; // how many degrees do we turn with '+' and '-'

function setup()
{
  createCanvas(800, 600);
  background(255);
  stroke(0, 0, 0, 255);
  
  // start our turtle in the middle of the screen
  x = width/2;
  y = height/2;
}

function draw()
{
  
  // give me some random color values:
  var r = random(128, 255);
  var g = random(0, 192);
  var b = random(0, 50);
  var a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 0;
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius+= random(0, 15);
  radius = radius/3;
  
  // draw the stuff:
  fill(r, g, b, a); // interior fill color
  ellipse(x, y, radius, radius); // circle that chases the mouse

}

function keyTyped()
{
  console.log(key); // what key did we type?
  
  if(key=='F') // draw forward
  {
    // polar to cartesian transformation based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new
    // update the turtle's position:
    x = x1;
    y = y1;
  }
  else if(key=='+')
  {
   currentangle+=angle; // turn left
  }
  else if(key=='-')
  {
   currentangle-=angle; // turn right   
  }
  
}

