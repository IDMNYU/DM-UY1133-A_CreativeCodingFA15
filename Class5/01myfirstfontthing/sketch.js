
var thefont; // this is the variable that is gonna have the font in it

var framecount = 0;


// this is a synchronous function that will let you 
// set stuff up before the setup function runs
function preload() {
  thefont = loadFont('./data/font1.otf'); // loads a font from the disk
}

function setup() {
  frameRate(60); // this is how fast we're drawing
  createCanvas(800, 600);
  textFont(thefont, 36);
}

function draw() {
  background(255);
  if(framecount<30)
  {
    fill(255);
    stroke(255, 0, 0);
  }
  else
  {
    fill(255, 0, 0);
    stroke(255, 0, 255);
  }
  text('hi there', mouseX, mouseY);

  framecount = (framecount+1) % 60
  
}