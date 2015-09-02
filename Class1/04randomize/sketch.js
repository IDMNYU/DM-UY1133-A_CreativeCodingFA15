function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
}

function draw() {
  // donald trump's hair:
  background(202, 159, 90, 50); // red, green, blue, alpha
  stroke(255, 255, 255);
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(mouseX, mouseY, 100, 100); // painter's algorithm
  fill(55, 74, 192);
  ellipse(mouseX+random(-50, 50), mouseY+random(-50,50), 20, 20);
}