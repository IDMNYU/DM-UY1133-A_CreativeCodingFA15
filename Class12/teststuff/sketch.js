function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  ellipse(random(0, width), random(0, height), 20, 20);
}