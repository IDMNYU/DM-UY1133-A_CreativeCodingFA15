function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
  // donald trump's hair:
  background(202, 159, 90, 50); // red, green, blue, alpha
}

function draw() {
  fill(55, 74, 192); // donald trump's tie
  var trump = (random(0, width)+random(0, width)+random(0, width))/3;
  ellipse(trump, mouseY, 20, 20);
}