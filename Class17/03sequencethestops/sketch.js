var stopfile, linefile, stoptimefile;

var stops = []; // this is gonna be all our stops - array
var lines = {}; // this is gonna be all our lines - JSON
var stoptimes = []; // these are our stoptimes

// initialize our boundaries to something stupid:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

// start out way zooomed out:
var drawscale = 1/10; // at what size are we drawing?
var drawtx;
var drawty;

// timing stuff:
var NOW = 0;
var SOON = 60;
var MIDNIGHT = 60*60*24; // how many seconds in a day?
var INTERVAL = 60; // how much we advance per frame


function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
  stoptimefile = loadStrings('./data/stop_times.txt');
  
}

function setup() {
  createCanvas(800, 600);
  console.log(linefile.length);
  dostops();
  dolines();
  dostoptimes();
  drawtx = width/2;
  drawty = height/2;
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  
  // do the time text:
  textSize(48);
  // fancy text formatting hack:
  var pad = '00';
  var hour = (pad+floor(NOW/3600)).slice(-pad.length);
  var minute = (pad+floor(NOW/60)%60).slice(-pad.length);
  var second = (pad+floor(NOW%60)).slice(-pad.length);
  text(hour+':'+minute+':'+second, 40, 75);

  
  
  translate(drawtx, drawty);
  scale(drawscale);
  
  drawthestuff();

  // update clock:
  NOW = (NOW+INTERVAL) % MIDNIGHT;
  SOON = NOW + INTERVAL;

}

function mtascale(thingie)
{
  var o = {};
  o.x = 10*map(thingie.long, LONGMIN, LONGMAX, width/2, -width/2);
  o.y = 10*map(thingie.lat, LATMIN, LATMAX, height/2, -height/2);
  
  return(o);
}