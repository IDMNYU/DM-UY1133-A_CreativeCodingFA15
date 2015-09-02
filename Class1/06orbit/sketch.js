
// stuff about the blue moon:
var d = 100; // distance
var a = 0; // angle

function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
}

function draw() {
  // donald trump's hair:
  background(202, 159, 90, 64); // red, green, blue, alpha
  stroke(255, 255, 255);
  ellipse(mouseX, mouseY, 100, 100); // painter's algorithm
  fill(0, 0, 255);
  ellipse(mouseX+d*cos(a), mouseY+d*sin(a), 20, 20);
  
  var velocityofthemouse = sqrt((pmouseX-mouseX)*(pmouseX-mouseX) + (pmouseY-mouseY)*(pmouseY-mouseY));
  var angleofthemouse = atan((pmouseY-mouseY)/(pmouseX-mouseX));
  // very very end
  a = a+(velocityofthemouse*.1);
  fill(0, 255, 0);
  rect(mouseX+30*cos(angleofthemouse), mouseY+30*sin(angleofthemouse), 50, 50);
}