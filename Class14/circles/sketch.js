function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  fill(random(255), random(255), random(255));
  ellipse(mouseX, mouseY, 20, 20);
}