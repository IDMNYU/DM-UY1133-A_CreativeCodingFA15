
var cols = 50;
var rows = 50;

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
      rect(i*xstep+xstep/2, j*ystep+ystep/2, xstep*0.8, ystep*0.8);
      //println("column: " + i + " row: " + j);
      red = clamp(red+random(-10, 10), 0, 255);
      green = clamp(green+random(-10, 10), 0, 255);
      blue = clamp(blue+random(-10, 10), 0, 255);
    }
  }
}

// this function keeps things in range
function clamp(thingie, themin, themax)
{
  // this fixes it if i screw up and make themin higher than themax:
  var realmin = min(themin, themax);
  var realmax = max(themin, themax);
  // figure it out:
  thingie = min(thingie, realmax);
  thingie = max(thingie, realmin);
  return(thingie);
}

