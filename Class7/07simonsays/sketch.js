var myVoice = new p5.Speech(); // new P5.Speech object
myVoice.interrupt = true;

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object

myRec.continuous = true; // do continuous recognition

myRec.interimResults = true; // allow partial recognition (faster, less accurate)

var x, y;
var dx, dy;

function setup() {
  // graphics stuff:
  createCanvas(800, 600);
  background(255, 255, 255);
  // instructions:
  textSize(20);
  textAlign(LEFT);
  text("say anything", 20, 20);

  // the important things are here:
  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
}

function draw() {
}

function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  myVoice.speak(myRec.resultString);
  console.log(myRec.resultString);
}