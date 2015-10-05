
var circles = new Array(1000);

function setup() {
  createCanvas(800, 600);

  for(var i = 0;i<1000;i++)
  {
    circles[i] = new theCircle(5); // make me a bunch of theCircle class
  }
  
  
}

function draw() {
  background(255);
 
  for(var i = 0;i<1000;i++)
  {
    circles[i].doit();
  }

}


// this is a 'theCircle' class
function theCircle(diameter)
{
  // this is the constructor:
  
  // these are properties (NOUNS):
  this.x = random(0, width);
  this.y = random(0, height);
  this.d = diameter;
  
  // these are methods (VERBS):
  this.doit = function()
  {
    // VERB: draw
    ellipse(this.x, this.y, this.d, this.d);
    // VERB: update position
    this.x+=random(-2, 2);
    this.y+=random(-2, 2);
  }
  
}
