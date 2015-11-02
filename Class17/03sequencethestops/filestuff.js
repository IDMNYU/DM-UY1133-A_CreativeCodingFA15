
function dostops()
{
  // start at 1 to skip the key:
  for(var i =  1;i<stopfile.length;i++)
  {
    var thedata = stopfile[i].split(',');
    var thestop = {}; // new empty object
    thestop.id = thedata[0];
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

function dolines()
{
  var newposition;
  lines = []; // re-initialize lines
  // start at 1 to skip the key:
  for(var i =  1;i<linefile.length;i++)
  {
    var thedata = linefile[i].split(',');
    var linename = thedata[0]; // this is the line we're talking about
    var linelat = thedata[1]; // this is its lat
    var linelong = thedata[2]; // this is its long
    var linepos = thedata[3]; // this is its order
    var match = 0;
    for(var j =  0;j<lines.length;j++)
    {
      if(lines[j].name==linename) // we've already seen this line
      {
        match = 1;
        newposition = {};
        newposition.lat = linelat;
        newposition.long = linelong;
        lines[j].points[linepos] = newposition;
      }
    }
    if(match===0) // new line
    {
      var newline = {};
      newline.name = linename;
      newline.points = [];
      newposition = {};
      newposition.lat = linelat;
      newposition.long = linelong;
      newline.points[linepos] = newposition;
      lines.push(newline);
    }

  }
}

function dostoptimes()
{
  console.log(stoptimefile.length);
  for(var i = 0;i<stoptimefile.length;i++)
  {
    // filter out all the stops that aren't on a weekday:
    if(stoptimefile[i].search('WKD')>-1)
    {
      var thestuff = stoptimefile[i].split(',');
      var newstop = {};
      
      // this was a big oops:
      // the time was coming in from the file like '03:57:30'
      // javascript screwed me over by interpreting the 
      // split array as an array of STRINGS, not numbers
      var departure = thestuff[2].split(':');
      
      // convert timestamp to seconds:
      // parseInt() forces numeric interpretation when it could be a STRING:
      newstop.departure = parseInt(departure[0])*3600 + parseInt(departure[1])*60 + parseInt(departure[2]);
      newstop.stopname = thestuff[3];
      stoptimes.push(newstop);
    }
  }
  console.log(stoptimes.length);
}