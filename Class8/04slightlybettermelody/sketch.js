// MIDI -> MUSICAL INSTRUMENT DIGITAL INTERFACE

var osc; // this is the thing that makes the sound
var thenotes = [62, 62, 64, 62, 67, 66, 62, 62, 64, 62, 69, 67, 62, 62, 74, 71, 67, 66, 64, 72, 72, 71, 67, 69, 67];

function setup() {
  createCanvas(800, 600);
  frameRate(4);
  osc = new p5.Oscillator(); // set it up
  osc.setType('square'); // what kind of sound?
  osc.start(); // start it going
}

function draw() {
  background(255);
  var thefreq = midiToFreq(thenotes[floor(random(0, thenotes.length))]);
  osc.freq(thefreq);
  var increment = map(mouseX, 0, width, 0.05, 0.3);
  var theamp = map(mouseY, 0, height, 1, 0);
  osc.amp(theamp, 0.1); // the 0.1 is how long to fade
}
