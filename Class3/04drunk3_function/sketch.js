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
  
  var drunkx = myDrunkenCurve(-20, 20, 30);
  var drunky = myDrunkenCurve(-20, 20, 30);;
  
  //println(dx + " " + dy);
  
  // this adds the distance and some drunkness to the position
  x2 = x1+random(min(0, dx), max(0, dx))+drunkx;
  y2 = y1+random(min(0, dy), max(0, dy))+drunky;
  
  var weight = sqrt((mouseX-pmouseX)*(mouseX-pmouseX)+(mouseY-pmouseY)*(mouseY-pmouseY));

  // draw the line
  strokeWeight(max(5, weight/2));
  noFill(); // don't draw a fill
  stroke(255, 255, 192, 100); // set the stroke to the nice purple
  line(x1, y1, x2, y2); // x1, y1, x2, y2
  
  // draw the circle
  fill(255, 192, 0, 100); // set the fill to yellow
  ellipse(x2, y2, weight, weight); // draw a circle
  
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


function myDrunkenCurve(min, max, Q)
{
  
  var value = 0.;
  
  for(var i = 0; i < Q; i++) // i = i + 1
  {
    value+=random(min, max);
  }
 
  value = value / Q;
  
  return(value);
  
}
