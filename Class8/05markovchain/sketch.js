// MIDI -> MUSICAL INSTRUMENT DIGITAL INTERFACE

var osc; // this is the thing that makes the sound
var thenotes = [62, 62, 64, 62, 67, 66, 62, 62, 64, 62, 69, 67, 62, 62, 74, 71, 67, 66, 64, 72, 72, 71, 67, 69, 67];
//var thenotes = [60, 63, 65, 72, 48, 67, 68, 63, 60, 58, 70, 72, 67, 62, 63, 60];
var thechain = {}; // new JSON

var thecurrentnote = 62;

function picknote(n)
{
  var pick = floor(random(0, thechain[n].length));
  return(thechain[n][pick]);
}

function domarkov()
{
  for(var i = 0;i<thenotes.length;i++)
  {
    if(!thechain[thenotes[i]]) { // isn't there yet
        console.log(thenotes[i] + " ain't there yet... adding... " + thenotes[(i+1)%thenotes.length]);
        thechain[thenotes[i]] = new Array();
        thechain[thenotes[i]][0] = thenotes[(i+1)%thenotes.length];
      }
      else { // it's there already
        thechain[thenotes[i]].push(thenotes[(i+1)%thenotes.length]);
        console.log("adding " + thenotes[(i+1)%thenotes.length] + " to " + thenotes[i]);
      }
  }
}


function setup() {
  createCanvas(800, 600);
  frameRate(4);
  osc = new p5.Oscillator(); // set it up
  osc.setType('square'); // what kind of sound?
  osc.amp(0.1);
  osc.start(); // start it going
  domarkov();
}

function draw() {
  background(255);
  console.log(thecurrentnote);
  var thefreq = midiToFreq(thecurrentnote);
  osc.freq(thefreq);
  thecurrentnote = picknote(thecurrentnote);
}
