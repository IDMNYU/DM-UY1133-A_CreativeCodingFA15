
var stoptimes;
var thestops = new Array(); // JSON

var NOW = 0;
var SOON = 60;
var MIDNIGHT = 60*60*24; // how many seconds in a day?
var INTERVAL = 15; // how much we advance per frame

function preload()
{
  stoptimes = loadStrings('./data/stop_times.txt');
}

function setup() {
  createCanvas(800, 600);
  dostoptimes();
}

function draw() {
  background(255);
  textSize(64);
  // fancy text formatting hack:
  var pad = '00';
  var hour = (pad+floor(NOW/3600)).slice(-pad.length);
  var minute = (pad+floor(NOW/60)%60).slice(-pad.length);
  var second = (pad+floor(NOW%60)).slice(-pad.length);
  text(hour+':'+minute+':'+second, width/2, height/2);
  
  for(var i =  0;i<thestops.length;i++)
  {
    if(thestops[i].departure>=NOW && thestops[i].departure<=SOON)
    {
      console.log(thestops[i].stopname);
    }
  }
  
  
  NOW = (NOW+INTERVAL) % MIDNIGHT;
  SOON = NOW + 60;
}

function dostoptimes()
{
  console.log(stoptimes.length);
  for(var i = 0;i<stoptimes.length;i++)
  {
    // filter out all the stops that aren't on a weekday:
    if(stoptimes[i].search('WKD')>-1)
    {
      var thestuff = stoptimes[i].split(',');
      var newstop = {};
      var departure = thestuff[2].split(':');
      
      // convert timestamp to seconds:
      newstop.departure = departure[0]*3600 + departure[1]*60 + departure[2];
      newstop.stopname = thestuff[3];
      console.log(newstop.departure);
      thestops.push(newstop);
    }
  }
  console.log(thestops.length);
}