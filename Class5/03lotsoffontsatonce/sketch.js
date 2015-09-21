
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
  textFont(thefont[0]);
  textSize(36);
  text('hi there', mouseX, mouseY-60);

  textFont(thefont[1]);
  textSize(9);
  text('hi there', mouseX, mouseY-30);

  textFont(thefont[2]);
  textSize(12);
  text('hi there', mouseX, mouseY+30);

  textFont(thefont[3]);
  textSize(18);
  text('hi there', mouseX, mouseY+60);



  framecount = (framecount+1) % 60
  
}

function keyReleased()
{

}