
var alice; // this is gonna hold the text file

var currentline = '';

var alicepositions = new Array();
var alicesizes = new Array();

function preload() {
  // ignore the bullshit error that happens when you do this:
  alice = loadStrings('./data/aliceinwonderland.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(alice.length); // how long is the file?
  
  doit();  
}

function draw() {
  background(255);
  var xposition = 0; // where on the x am i typing?

  for(var i = 0;i<currentline.length;i++)
  {
    textSize(alicesizes[i]);
    text(currentline.charAt(i), xposition, alicepositions[i]);
    xposition+=textWidth(currentline.charAt(i));
    alicepositions[i] += random(1, 5);
  }

}

function keyReleased()
{
  doit();

}

function doit()
{
  var whichline = floor(random(0, alice.length)); // pick a new line
  currentline = alice[whichline]; // set the current line to the text
  // blow out all the position and size data and start over:
  alicepositions = new Array(currentline.length);
  alicesizes = new Array(currentline.length);
  for(var i = 0;i<currentline.length;i++)
  {
    alicepositions[i] = 0;
    alicesizes[i] = random(12, 45);
  }

}