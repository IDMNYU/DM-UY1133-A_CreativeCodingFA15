// groovy

// at the top of the sketch
var r, g, b, x1, y1, x2, y2; // GLOBAL variables

function setup() {
  createCanvas(800, 600); // sets up the size of the canvas
  
  background(0, 0, 0);
  
  x1 = width/2;
  y1 = height/2;

}

function draw() {
  // this fades out the previous stuff
  noStroke();
  fill(0, 0, 0, 10);
  rect(0, 0, width-1, height-1);
  
  // this is how far away the thingie is from the mouse
  var dx = (mouseX-x1)/20.;
  var dy = (mouseY-y1)/20.;
  
  var drunkx = 0.;
  drunkx += random(-20, 20);
  drunkx += random(-20, 20);
  drunkx += random(-20, 20);
  drunkx = drunkx / 3.;
  var drunky = 0.;
  drunky += random(-20, 20);
  drunky += random(-20, 20);
  drunky += random(-20, 20);
  drunky = drunky / 3.;
  
  //println(dx + " " + dy);
  
  // this adds the distance and some drunkness to the position
  x2 = x1+random(min(0, dx), max(0, dx))+drunkx;
  y2 = y1+random(min(0, dy), max(0, dy))+drunky;
  
  // draw the line
  noFill(); // don't draw a fill
  stroke(255, 255, 192, 100); // set the stroke to the nice purple
  line(x1, y1, x2, y2); // x1, y1, x2, y2
  
  // draw the circle
  var radius = random(5, 20);
  fill(255, 192, 0, 100); // set the fill to yellow
  ellipse(x2, y2, radius, radius); // draw a circle
  
  // stash our new x and y for the next round
  x1 = x2;
  y1 = y2;
  
  // checking the boundaries
  if(x1>width) x1 = 0;
  if(x1<0) x1 = width;
  if(y1>height) y1 = 0;
  if(y1<0) y1 = height;
  
  
}

function keyReleased()
{
  if(key==' ') background(0, 0, 0);

}