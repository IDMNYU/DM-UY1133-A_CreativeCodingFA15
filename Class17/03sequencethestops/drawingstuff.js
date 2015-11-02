
function drawthestuff()
{
  var i, pos;
  // these are the lines:
  stroke(0, 0, 128);
  for(i = 0;i<lines.length;i++)
  {
    beginShape();
    for(var j = 0;j<lines[i].points.length;j++)
    {
      pos = mtascale(lines[i].points[j]);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
  
  // these are the stations:
  stroke(255);
  textSize(15);
  noFill();
  for(i = 0;i<stops.length;i++)
  {
    pos = mtascale(stops[i]);
    ellipse(pos.x, pos.y, 20, 20);
    text(stops[i].name, pos.x + 20, pos.y)
    
  }
  
  fill(255, 0, 0);
  for(i =  0;i<stoptimes.length;i++)
  {
    if(stoptimes[i].departure>=NOW && stoptimes[i].departure<=SOON)
    {
      //console.log(stoptimes[i].stopname);
      for(j = 0;j<stops.length;j++)
      {
        if(stoptimes[i].stopname==stops[j].id)
        {

          //console.log(stops[j].name);
          pos = mtascale(stops[j]);
          ellipse(pos.x, pos.y, 40, 40);
          
        }
      }
    }
  }
}