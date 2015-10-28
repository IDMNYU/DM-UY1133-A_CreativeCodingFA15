
function dostops()
{
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

function dolines()
{
  lines = new Array(); // re-initialize lines
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
        var newposition = {};
        newposition.lat = linelat;
        newposition.long = linelong;
        lines[j].points[linepos] = newposition;
      }
    }
    if(match==0) // new line
    {
      var newline = {};
      newline.name = linename;
      newline.points = new Array();
      var newposition = {};
      newposition.lat = linelat;
      newposition.long = linelong;
      newline.points[linepos] = newposition;
      lines.push(newline);
    }

  }
}