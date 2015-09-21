
var HOWMANYFONTS = 4; // how many fonts do i have?

var thefont = new Array(4); // this is the variable that is gonna have the font in it

var whichfont = 0;

var framecount = 0;

var thewords = ['my', 'dog', 'has', 'fleas'];

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

  textSize(30);
  var xposition = mouseX;
  
  for(var i = 0;i<4;i++)
  {
    //textAlign(CENTER);
    //textFont(thefont[i]);
    textSize(framecount);
    fill(random(0, 255));
    text(thewords[i]+' ', xposition, mouseY);
    xposition += textWidth(thewords[i]+' ');
    console.log(textWidth(thewords[i]+' '));
  }

  framecount = (framecount+1)%60;
}

function keyReleased()
{

}