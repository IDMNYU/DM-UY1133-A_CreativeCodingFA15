
function drawthestuff()
{
  // these are the lines:
  stroke(0, 0, 128);
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
  
  // these are the stations:
  stroke(255);
  textSize(15);
  for(var i = 0;i<stops.length;i++)
  {
    var pos = mtascale(stops[i]);
    ellipse(pos.x, pos.y, 20, 20);
    text(stops[i].name, pos.x + 20, pos.y)
    
  }
}