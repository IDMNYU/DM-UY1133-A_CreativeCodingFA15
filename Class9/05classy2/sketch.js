
var NUMCIRCLES = 10;

var circles = new Array(NUMCIRCLES);

function setup() {
  createCanvas(800, 600);

  for(var i = 0;i<NUMCIRCLES;i++)
  {
    circles[i] = new theCircle(random(5,30)); // make me a bunch of theCircle class
  }
  
  
}

function draw() {
  background(255);
  fill(0);
 
  for(var i = 0;i<NUMCIRCLES;i++)
  {
    circles[i].doit(mouseX, mouseY);
  }

}


// this is a 'theCircle' class
function theCircle(diameter)
{
  // this is the constructor:
  
  // these are properties (NOUNS):
  this.x = random(0, width);
  this.y = random(0, height);
  this.a = random(0, TWO_PI);
  this.v = random(0.3, 4);
  this.d = diameter;
  
  // these are methods (VERBS):
  this.doit = function(tx, ty)
  {
    // VERB: draw
    ellipse(this.x, this.y, this.d, this.d);
    // VERB: update position
    
    this.a = atan((ty-this.y)/(tx-this.x));
    if(tx<this.x) this.a+=PI;
    var distance = sqrt((this.x-tx)*(this.x-tx) + (this.y-ty)*(this.y-ty));
    
    this.v = constrain(1000-distance, 0, 1000);
    this.v = this.v*0.001;
    
    this.x = this.x+this.v*cos(this.a);
    this.y = this.y+this.v*sin(this.a);
    if(this.x>width) this.x = 0;
    if(this.x<0) this.x = width;
    if(this.y>height) this.y = 0;
    if(this.y<0) this.y = height;
  }
  
}
