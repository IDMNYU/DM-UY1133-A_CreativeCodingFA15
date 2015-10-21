var x, y;

var shapestack = new Array(); // all the shapes all at once

var currentshape;

function setup() {
  createCanvas(800, 600);
  background(255);
  x = width/2;
  y = height/2;
}

function draw() {
  background(255);
  fill(255, 0, 0);
  for(var i = 0;i<shapestack.length;i++)
  {
    //var xform = random(-5, 5);
    //var yform = random(-5, 5);
    beginShape();
    for(var j = 0;j<shapestack[i].length;j++)
    {
      vertex(shapestack[i][j][0], shapestack[i][j][1]);
      shapestack[i][j][0]+=random(-1, 1);
      shapestack[i][j][1]+=random(-1, 1);
    }
    endShape();
  }
}

function mouseDragged()
{
  var coords = [mouseX, mouseY];
  currentshape.push(coords);
}

function mousePressed()
{
  currentshape = new Array(); // single shape
  var coords = [mouseX, mouseY]; // x y array
  currentshape.push(coords);
  console.log("pressed!!!!")
}

function mouseReleased()
{
  var coords = [mouseX, mouseY];
  currentshape.push(coords);
  shapestack.push(currentshape);
}