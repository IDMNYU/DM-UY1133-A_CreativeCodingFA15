
var cols = 30;
var rows = 30;

var red, green, blue;

function setup() {
  createCanvas(800, 800); // sets up the size of the canvas

  red = random(0, 255);
  green = random(0, 255);
  blue = random(0, 255);

  drawEverything();
}

function draw() {
  drawEverything();
}

function keyReleased()
{
  drawEverything();
}

function drawEverything()
{
  background(255);

  var xstep = width/cols;
  var ystep = height/rows;

  for (var i =0; i<cols; i++)
  {
    for (var j =0; j<rows; j++)
    {
      fill(red, green, blue);
      rect(i*xstep, j*ystep, xstep*0.8, ystep*0.8);
      //println("column: " + i + " row: " + j);
      // constrain keeps things in a range
      red = constrain(red+random(-10, 10), 0, 255);
      green = constrain(green+random(-10, 10), 0, 255);
      blue = constrain(blue+random(-10, 10), 0, 255);
    }
  }
}
