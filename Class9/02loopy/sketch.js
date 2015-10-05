
var a = 0; // these are global
var b = 0;

var osc1, osc2;

function setup() {
  createCanvas(800, 600);
  frameRate(8);
  
  osc1 = new p5.Oscillator(); // set it up
  osc1.setType('square'); // what kind of sound?
  osc1.freq(300);
  osc1.start(); // start it going
  osc2 = new p5.Oscillator(); // set it up
  osc2.setType('square'); // what kind of sound?
  osc2.freq(400);
  osc2.start(); // start it going

  
}

function draw() {
  background(255);
  fill(255, 0, 0);
  if(a==0) ellipse(50, 50, 20, 20);
  fill(0, 0, 255);
  if(b==0) ellipse(100, 50, 20, 20);

  fill(0);
  textSize(30);
  text(a, 50, 50);
  text(b, 100, 50);
  
  if(a==0) osc1.amp(0.5); else osc1.amp(0);
  if(b==0) osc2.amp(0.5); else osc2.amp(0);

  a = (a+1) % 4;
  b = (b+1) % 5;
}
