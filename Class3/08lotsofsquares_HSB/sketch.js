var cols = 30;
var rows = 30;

var h, s, b;

function setup() {
  createCanvas(800, 800); // sets up the size of the canvas

  // this is the thing to look at:
  colorMode(HSB, 255.);

  h = 0;
  s = 128.;
  b = 255.;

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
  h = 0;

  var xstep = width / cols;
  var ystep = height / rows;

  for (var i = 0; i < cols * rows; i++) {
    fill(h, s, b);
    rect(Math.floor(i % cols) * xstep, Math.floor(i / cols) * ystep, xstep * 0.8, ystep * 0.8);
    //println("column: " + i%cols + " row: " + i/cols);
    h = (h + 5) % 255.;
  }

}
