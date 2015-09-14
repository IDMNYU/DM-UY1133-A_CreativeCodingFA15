// check this out:
// http://numeral.com/agents/gateFiles/

function setup() {
  createCanvas(800, 600); // sets up the size of the canvas
  
  background(0, 0, 0);

}

function draw() {
  if(mouseIsPressed)
  {
    var d = sqrt((pmouseX-mouseX)*(pmouseX-mouseX) + (pmouseY-mouseY)*(pmouseY-mouseY));
    d = d*0.5;
    
    fill(255);
    stroke(0);
    strokeWeight(1);
    ellipse(mouseX, mouseY, d, d);
    
    stroke(255, 255, 0);
    strokeWeight(d/5);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function keyReleased()
{
  if(key==' ') background(0, 0, 0);

}
