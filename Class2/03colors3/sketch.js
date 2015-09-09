var r, g, b; // declare some variables
var d; // declare some more variables
var i = 5; // increment


function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
  
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  d = random(5, 100); // random diameter
  
  console.log("hi there!");

  background(255); // red, green, blue, alpha
}

function draw() {
  fill(r, g, b); // my colors
  ellipse(mouseX, mouseY, d, d);
  d = d+i;
  if(d>200 || d<0) i = i*-1; // d above 200 OR d below 0

  r = floor((r+1)%256); // ignore the stuff after the .
  g = floor((g+1)%256);
  b = floor((b+1)%256);
  console.log('colors: ' + r + ', ' + g + ', ' + b);
}

function keyPressed() // callback function
{


}