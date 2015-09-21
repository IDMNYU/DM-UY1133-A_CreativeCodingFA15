
var HOWMANYFONTS = 4; // how many fonts do i have?

var thefont = new Array(4); // this is the variable that is gonna have the font in it

var whichfont = 0;

var framecount = 0;


// this is a synchronous function that will let you 
// set stuff up before the setup function runs
function preload() {
  for(var i = 0;i<HOWMANYFONTS;i++)
  {
    var fontname = './data/font'+i+'.otf';
    console.log(fontname);
    thefont[i] = loadFont(fontname);
  }
}

function setup() {
  frameRate(60); // this is how fast we're drawing
  createCanvas(800, 600);
  textFont(thefont[whichfont], 36);
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

function keyReleased()
{
   whichfont = (whichfont+1)%4;
  textFont(thefont[whichfont], 36);


}