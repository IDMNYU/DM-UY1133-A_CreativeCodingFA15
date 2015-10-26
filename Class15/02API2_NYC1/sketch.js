var rats, ratsGeo; // these things store JSON data from two APIs

// city of new york API endpoint for the last 1000 health inspections:
var baseurl1 = 'https://data.cityofnewyork.us/resource/xx67-kt59.json?$limit=1000';
// google API endpoint to get geometry off of a zip code:
var baseurl2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

var AREWEREADY = 0; // this is whether we are ready to draw
var ratwearefinding = 0; // this is which rat we are geocoding


var currentrat = 0;

var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180
var LONGMAX = -180;

function setup() {
  createCanvas(1000, 700);
  frameRate(5);
  downloadRats(); // START THE STUFF DOWNLOADING
}

function draw() {
  background(255);
  if(AREWEREADY)
  {
    // drawing goes here
    textAlign(CENTER);
    //text("WE ARE READY!", width/2, height/2);
    
    for(var i = 0;i<rats.length;i++)
    {
      if(rats[i].longitude!=undefined) {
        var thex = map(rats[i].longitude, LONGMIN, LONGMAX, 0, width-1);
        var they = map(rats[i].latitude, LATMIN, LATMAX, height-1, 0);
        ellipse(thex, they, 5, 5);
        if(rats[i].dba!=undefined) text(rats[i].dba, thex, they);
      }
    }
    
    
  }
  else
  {
    textAlign(CENTER);
    text("working on it: " + ratwearefinding, width/2, height/2);
  }
  
/*
  background(255);
  var dba = rats[currentrat].dba;
  var cuisine = rats[currentrat].cuisine_description;
  var desc = rats[currentrat].violation_description;
  textAlign(LEFT);
  if(dba!=undefined) text(dba, 20, 20);
  if(cuisine!=undefined) text(cuisine, 20, 40);
  if(desc!=undefined) text(desc, 20, 60);
    
    
    currentrat = (currentrat+1) % rats.length;
  */
}


// this is gonna grab the NYC open data stuff
function downloadRats()
{
  // this will download the city open data on the health violations:
  rats = loadJSON(baseurl1, ratsDownloaded); // asynchronous API call
}

// this runs after it's download the open data stuff and start firing
// off the geocoding:
function ratsDownloaded()
{
  // this will run once the city open data is grabbed, and 
  // one at a time will geocode it
  console.log(rats.length); // how many records?
  findRats(); // start finding rats
}

// this runs to geocode the current rat (ratwearefinding):
function findRats()
{
  // this is gonna geocode (google) each record of the rats
  var bldg = rats[ratwearefinding].building;
  var street = rats[ratwearefinding].street;
  var zip = rats[ratwearefinding].zipcode;
  ratsGeo = loadJSON(baseurl2+bldg+' '+street+' '+zip, ratsFound);
}

// this runs when it's found a rat's location
function ratsFound()
{
  // this is gonna run when the geocode is finished
  if(ratsGeo.results[0]!=undefined)
  {
    // stashes it in an existing data structure:
    rats[ratwearefinding].latitude = ratsGeo.results[0].geometry.location.lat;
    rats[ratwearefinding].longitude = ratsGeo.results[0].geometry.location.lng;

    if(rats[ratwearefinding].latitude<LATMIN) LATMIN=rats[ratwearefinding].latitude;
    if(rats[ratwearefinding].latitude>LATMAX) LATMAX=rats[ratwearefinding].latitude;
    if(rats[ratwearefinding].longitude<LONGMIN) LONGMIN=rats[ratwearefinding].longitude;
    if(rats[ratwearefinding].longitude>LONGMAX) LONGMAX=rats[ratwearefinding].longitude;
  }
  else
  {
  }

  ratwearefinding++;
  if(ratwearefinding<rats.length) {
    setTimeout(function() {findRats()}, 10);
  }
  else {
    AREWEREADY=1;
    console.log("LATMIN: " + LATMIN);
    console.log("LATMAX: " + LATMAX);
    console.log("LONGMIN: " + LONGMIN);
    console.log("LONGMAX: " + LONGMAX);
  }
  
}
