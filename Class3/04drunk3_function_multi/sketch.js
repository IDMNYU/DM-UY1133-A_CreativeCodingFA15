// groovy

// at the top of the sketch
var numShoeStrings = 10; // how many weird yellow things?
var x1 = new Array(numShoeStrings);
var y1 = new Array(numShoeStrings);
var x2 = new Array(numShoeStrings);
var y2 = new Array(numShoeStrings); // GLOBAL variables

function setup() {
  createCanvas(800, 600); // sets up the size of the canvas
  
  background(0, 0, 0);
  
  for(var i  = 0;i< x1.length;i=i+1)
  {
    x1[i] = random(0, width);
    y1[i] = random(0, height);
  }

}

function draw() {
  // this fades out the previous stuff
  noStroke();
  fill(0, 0, 0, 10);
  rect(0, 0, width-1, height-1);
  

  var weight = sqrt((mouseX-pmouseX)*(mouseX-pmouseX)+(mouseY-pmouseY)*(mouseY-pmouseY));

  for(var i  = 0;i< numShoeStrings;i=i+1)
  {
    // this is how far away the thingie is from the mouse
    var dx = (mouseX-x1[i])/20.;
    var dy = (mouseY-y1[i])/20.;
    
    var drunkx = myDrunkenCurve(-20, 20, 30);
    var drunky = myDrunkenCurve(-20, 20, 30);;
    
    //println(dx + " " + dy);
    
    // this adds the distance and some drunkness to the position
    x2[i] = x1[i]+random(min(0, dx), max(0, dx))+drunkx;
    y2[i] = y1[i]+random(min(0, dy), max(0, dy))+drunky;
    
    // draw the line
    strokeWeight(max(5, weight/2));
    noFill(); // don't draw a fill
    stroke(255, 255, 192, 100); // set the stroke to the nice purple
    line(x1[i], y1[i], x2[i], y2[i]); // x1, y1, x2, y2
    
    // draw the circle
    fill(255, 192, 0, 100); // set the fill to yellow
    ellipse(x2[i], y2[i], weight, weight); // draw a circle
    
    // stash our new x and y for the next round
    x1[i] = x2[i];
    y1[i] = y2[i];
    
  }
}

function keyReleased()
{
  if(key==' ') background(0, 0, 0);

}


// implements a gaussian distribution
// (a.k.a. the dungeons and dragons algorithm)
// with a variable width so we can get super random
// versus very constrained random behavior
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
