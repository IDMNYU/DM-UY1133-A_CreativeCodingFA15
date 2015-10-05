
var thestring;
var thefont;

var whichline = 0;

function preload()
{
  thestring = loadStrings("./data/lyrics.txt");
  thefont = loadFont("./data/PrestigeEliteStd.otf");
}

function setup() {
  createCanvas(800, 600);
  textFont(thefont);
  textSize(32);
}

function draw() {
  background(255);
  fill(255, 0, 0);
  text(thestring[whichline], 20, 30);
}

function keyReleased()
{
  whichline = (whichline+1) % thestring.length;
}