var stopfile;

var stops = new Array(); // this is gonna be all our stops

// initialize our boundaries to something stupid:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

function preload() {
  stopfile = loadStrings('./data/stops.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(stopfile.length);
  // start at 1 to skip the key:
  for(var i =  1;i<stopfile.length;i++)
  {
    var thedata = stopfile[i].split(',');
    var thestop = {}; // new empty object
    thestop.name = thedata[2];
    thestop.lat = thedata[4];
    thestop.long = thedata[5];
    // update boundaries if necessary:
    if(thestop.lat<LATMIN) LATMIN = thestop.lat;
    if(thestop.lat>LATMAX) LATMAX = thestop.lat;
    if(thestop.long<LONGMIN) LONGMIN = thestop.long;
    if(thestop.long>LONGMAX) LONGMAX = thestop.long;
    stops.push(thestop); // fill up 'thestop' with a new entry
  }
}

function draw() {
  background(0);
  noFill();
  stroke(255);
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