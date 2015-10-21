var x, y;

function setup() {
  createCanvas(800, 600);
  background(255);
  x = width/2;
  y = height/2;
}

function draw() {
  //background(255);
}

function mouseDragged()
{
  console.log("dragging");
  line(x, y, mouseX, mouseY);
  fill(255, 0, 0);
  vertex(mouseX, mouseY);
  //ellipse(mouseX, mouseY, pmouseX-mouseX, pmouseY-mouseY);
  x = mouseX;
  y = mouseY;
}

function mousePressed()
{
  beginShape();
  vertex(mouseX, mouseY);
  console.log("pressed!!!!")
  x = mouseX;
  y = mouseY;
}

function mouseReleased()
{
  vertex(mouseX, mouseY);
  endShape();
}