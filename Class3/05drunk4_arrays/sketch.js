// groovy

// GLOBAL variables
var NUMGNATS = 300;
var x1 = new Array(NUMGNATS);
var y1 = new Array(NUMGNATS);
var x2 = new Array(NUMGNATS);
var y2 = new Array(NUMGNATS);
var rad = new Array(NUMGNATS);
var r = new Array(NUMGNATS);
var g = new Array(NUMGNATS);
var b = new Array(NUMGNATS);


var p1x = 0;
var p1y = -10;
var p2x = -10;
var p2y = 10;
var p3x = 10;
var p3y = 10;


function setup() {
  createCanvas(800, 600); // sets up the size of the canvas
  
  background(0, 0, 0);
  
  background(0, 0, 0);

  for (var i=0; i<NUMGNATS; i++)
  {
    x1[i] = random(0, width-1);
    y1[i] = random(0, height-1);
    rad[i] = random(5, 30);
    r[i] = random(128, 255);  
    g[i] = random(128, 255);  
    b[i] = random(128, 255);  
  }

}

function draw() {
  // this fades out the previous stuff
  noStroke();
  fill(0, 0, 0, 10);
  rect(0, 0, width, height);


  var weight = sqrt((mouseX-pmouseX)*(mouseX-pmouseX)+(mouseY-pmouseY)*(mouseY-pmouseY));
  var aa = max(0.01, min(weight/50., 1.0));
  var bb = 1.0-aa;

  // THIS IS THE MAIN LOOP
  for (var i = 0; i<NUMGNATS; i++)
  {
    // this is how far away the thingie is from the mouse
    var dx = (mouseX-x1[i])/20.;
    var dy = (mouseY-y1[i])/20.;
    var drunkx = myDrunkenCurve(-50, 50, 3);
    var drunky = myDrunkenCurve(-50, 50, 3);
    ;
    // this adds the distance and some drunkness to the position
    var shiftx = x1[i]+random(min(0, dx), max(0, dx))+drunkx;
    var shifty = y1[i]+random(min(0, dy), max(0, dy))+drunky;
    x2[i] = aa*shiftx + bb*x1[i];
    y2[i] = aa*shifty + bb*y1[i];


    // draw the line
    noFill(); // don't draw a fill
    stroke(255, 255, 192, 100); // set the stroke to the nice purple
    line(x1[i], y1[i], x2[i], y2[i]); // x1, y1, x2, y2


    // draw the circle
    fill(r[i], g[i], b[i], 100); // set the fill to yellow
    triangle(x2[i]+p1x, y2[i]+p1y, x2[i]+p2x, y2[i]+p2y, x2[i]+p3x, y2[i]+p3y); // draw a circle
    fill(r[i]/2, g[i]/2, b[i]/2, 100); // set the fill to yellow
    ellipse(x2[i], y2[i], rad[i], rad[i]);

    // stash our new x and y for the next round
    x1[i] = x2[i];
    y1[i] = y2[i];


    // checking the boundaries
    if (x1[i]>width) x1[i] = 0;
    if (x1[i]<0) x1[i] = width;
    if (y1[i]>height) y1[i] = 0;
    if (y1[i]<0) y1[i] = height;
  }
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
