
var jane; // this is gonna hold the text file

var thechapter; // this is gonna hold the current chapter

var thefont;

var currentchapter = 0;

function preload() {
  // ignore the bullshit error that happens when you do this:
  jane = loadStrings('./data/austin_cooked.txt');
  thefont = loadFont('./data/font1.otf'); // loads a font from the disk
}

function setup() {
  createCanvas(800, 600);
  console.log(jane.length); // how long is the file?
  console.log(jane[currentchapter]); // print first line
  thechapter=jane[currentchapter].split(' '); // individual words
  console.log(thechapter);
  textFont(thefont, 18);
  doit();  
}

function draw() {
  background(255);
  var xposition = 20;
  var yposition = 50;
  // go through every word in the chapter:
  for(var i = 0;i<thechapter.length;i++)
  {
    // pick a psychedelic color:
    fill(random(255), random(255), random(255));
    // figure out how WIDE the word is (plus a space after):
    var tw = textWidth(thechapter[i]+'  ');
    if(xposition+tw>width) // over the edge?
    {
      // yes... move the xposition back the left and move the y position up one line
      xposition = 20; // carriage return
      yposition = yposition + 20; // line feed
    }
    // draw the text
    text(thechapter[i]+'  ', xposition, yposition);
    // increment the xposition
    xposition = xposition + tw;
  }
//  text(jane[currentchapter], xposition, yposition);
}

function keyReleased()
{
  currentchapter = (currentchapter+1)%jane.length;
  console.log(jane[currentchapter]); // print the line
  thechapter=jane[currentchapter].split(' '); // individual words
  console.log(thechapter);
}

function doit()
{

}