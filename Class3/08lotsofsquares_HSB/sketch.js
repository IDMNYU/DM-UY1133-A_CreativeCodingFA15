var cols = 10;
var rows = 10;

var h, s, b;

function setup() {
  createCanvas(800, 800); // sets up the size of the canvas

  colorMode(HSB, 255.);

  h = 0;
  s = 128.;
  b = 192.;

  drawEverything();
}

function draw() {
  drawEverything();
}

function keyReleased() {
  drawEverything();
}

function drawEverything() {
  background(0, 0, 255);

  var xstep = width / cols;
  var ystep = height / rows;

  for (var i = 0; i < cols * rows; i++) {
    fill(h, s, b);
    rect(Math.floor(i % cols) * xstep + xstep / 2, Math.floor(i / cols) * ystep + ystep / 2, xstep * 0.8, ystep * 0.8);
    //println("column: " + i%cols + " row: " + i/cols);
    h = (h + random(-50, 50) + 256) % 255.;
  }

}

// this function keeps things in range
function clamp(thingie, themin, themax) {
  // this fixes it if i screw up and make themin higher than themax:
  var realmin = min(themin, themax);
  var realmax = max(themin, themax);
  // figure it out:
  thingie = min(thingie, realmax);
  thingie = max(thingie, realmin);
  return (thingie);
}