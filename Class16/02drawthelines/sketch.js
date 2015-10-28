var stopfile, linefile;

var stops = new Array(); // this is gonna be all our stops
var lines = {}; // this is gonna be all our lines

// initialize our boundaries to something stupid:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(linefile.length);
  dostops();
  dolines();
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  
  for(var i = 0;i<lines.length;i++)
  {
    beginShape();
    for(var j = 0;j<lines[i].points.length;j++)
    {
      var pos = mtascale(lines[i].points[j]);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
  
  for(var i = 0;i<stops.length;i++)
  {
    var pos = mtascale(stops[i]);
    ellipse(pos.x, pos.y, 5, 5);
    
  }
}

function mtascale(thingie)
{
  var o = {};
  o.x = map(thingie.long, LONGMIN, LONGMAX, width, 0);
  o.y = map(thingie.lat, LATMIN, LATMAX, height, 0);
  
  return(o);
}