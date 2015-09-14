var thex, they;
var v; // velocity
var t; // angle

function setup() {
  createCanvas(800, 400); // sets up the size of the canvas

  background(0);

  thex = random(0, width);
  they = random(0, height);

  v = random(5, 20); // random velocity
  t = random(0, TWO_PI); // random angle
}

function draw() {
  background(0);
  fill(255);
  ellipse(thex, they, 30, 30);

  thex = thex+v*cos(t);
  they = they+v*sin(t);
  
  if(thex>width) t = PI - t;
  if(thex<0) t = PI -t;
  if(they>height) t = TWO_PI - t;
  if(they<0) t = TWO_PI - t;
  
}

function keyReleased() {

  thex = random(0, width);
  they = random(0, height);

  v = random(5, 20); // random velocity
  t = random(0, TWO_PI); // random angle
}
