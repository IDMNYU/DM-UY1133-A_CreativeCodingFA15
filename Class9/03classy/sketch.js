var exes = new Array(1000); // the x position
var eyes = new Array(1000); // the y position

function setup() {
  createCanvas(800, 600);

  for(var i = 0;i<1000;i++)
  {
    exes[i] = random(0, width);
    eyes[i] = random(0, height);
  }
  
  
}

function draw() {
  background(255);
 
  for(var i = 0;i<1000;i++)
  {
    // verbs: draw, update
    ellipse(exes[i], eyes[i], 5, 5);
    exes[i]+=random(-2, 2);
    eyes[i]+=random(-2, 2);
  }

}
