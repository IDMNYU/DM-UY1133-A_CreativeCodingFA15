function setup() {
  createCanvas(800, 200);
  background(255);
}

function draw() {
  stroke(0);
  noFill();
  var d = myDrunkenCurve(0, 800, mouseY);
  ellipse(d, height/2, 5, 5);
}

function keyReleased()
{
  background(255);
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
