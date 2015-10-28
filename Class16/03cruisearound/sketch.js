var stopfile, linefile;

var stops = new Array(); // this is gonna be all our stops
var lines = {}; // this is gonna be all our lines

// initialize our boundaries to something stupid:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

// start out way zooomed out:
var drawscale = 1/10; // at what size are we drawing?
var drawtx;
var drawty;

function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(linefile.length);
  dostops();
  dolines();
  drawtx = width/2;
  drawty = height/2;
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  
  translate(drawtx, drawty);
  scale(drawscale);
  
  drawthestuff();
}

function mtascale(thingie)
{
  var o = {};
  o.x = 10*map(thingie.long, LONGMIN, LONGMAX, width/2, -width/2);
  o.y = 10*map(thingie.lat, LATMIN, LATMAX, height/2, -height/2);
  
  return(o);
}