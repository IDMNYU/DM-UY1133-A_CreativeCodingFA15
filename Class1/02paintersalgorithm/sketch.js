function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
  // donald trump's hair:
  background(202, 159, 90); // red, green, blue
}

function draw() {
  ellipse(50, 50, 100, 100); // painter's algorithm
  fill(55, 74, 192);
  stroke(255, 255, 255);
  ellipse(mouseX, mouseY, 20, 20);
}