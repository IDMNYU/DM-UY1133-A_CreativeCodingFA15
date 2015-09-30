var osc; // this is the thing that makes the sound

function setup() {
  createCanvas(800, 600);
  osc = new p5.Oscillator(); // set it up
  osc.setType('sine'); // what kind of sound?
  osc.start(); // start it going
}

function draw() {
  background(255);
  var thefreq = map(mouseX, 0, width, 100, 1000);
  osc.freq(thefreq);
  var theamp = map(mouseY, 0, height, 1, 0);
  osc.amp(theamp, 0.1); // the 0.1 is how long to fade
}
