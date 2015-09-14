var thex, they;
var c; // cosine value
var incr; // increment

function setup() {
  createCanvas(800, 400); // sets up the size of the canvas

  background(0);

  thex = 0;
  they = height/2;

  c = 0.; // start at zero
  incr = 0.1;
}

function draw() {
  fill(255);
  ellipse(thex, they, 10, 10);
  
  incr = map(mouseX, 0, width-1, 0., 0.25);
  
  c = (c+incr) % TWO_PI;
  println(c);

  thex = thex+1; // increment the x value
  if(thex>width)
  {
     thex = 0;
     background(0); 
  }
  // map is your best friend:
  
  var theamp = mouseY/2;
  
  they = map(sin(c), -1., 1., 0+theamp, height-theamp);
  
}

function keyReleased() {
}
