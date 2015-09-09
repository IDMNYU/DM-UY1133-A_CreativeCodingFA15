var r, g, b; // declare some variables

function setup() {
  // this is a comment
  createCanvas(800, 600); // width and height
  
  r = 128;
  g = 128;
  b = 0;
  
  console.log("hi there!");

  background(255); // red, green, blue, alpha
}

function draw() {
  r = map(mouseY, 0, height-1, 255, 0);
  b = map(mouseX, 0, width-1, 0, 255);
  console.log(b);
  fill(r, g, b); // my colors
  ellipse(mouseX, mouseY, 20, 20);
}

function keyPressed() // callback function
{
  console.log(key); // print out what key i hit
  console.log(key=='C');
  if(key=='C') { // conditional
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
  }

}