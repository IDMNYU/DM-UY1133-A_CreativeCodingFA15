
var NUMDONALDS = 100;
var NUMPICS = 3;

var thedonald = new Array(NUMPICS); // this holds the image

var jeb;

var circles = new Array(NUMDONALDS);

function preload() {
  jeb = loadImage('./data/jeb.jpg');
  for(var i = 0;i<NUMPICS;i++) {
    thedonald[i] = loadImage('./data/trump'+(i+1)+'.png');
  }
}

function setup() {
  createCanvas(800, 600);

  for(var i = 0;i<NUMDONALDS;i++)
  {
    var whichdonald = thedonald[floor(random(NUMPICS))];
    circles[i] = new theTrump(whichdonald, random(20,50)); // make me a bunch of theCircle class
  }
  
  
}

function draw() {
  background(255);
  fill(0);
  image(jeb, mouseX-25, mouseY-25, 50, 50);
 
  for(var i = 0;i<NUMDONALDS;i++)
  {
    circles[i].doit(mouseX, mouseY);
  }

}


// this is a 'theTrump' class
function theTrump(theimage, diameter)
{
  // this is the constructor:
  
  // these are properties (NOUNS):
  this.x = random(0, width);
  this.y = random(0, height);
  this.a = random(0, TWO_PI);
  this.v = random(0.3, 4);
  this.d = diameter;
  this.img = theimage;
  
  // these are methods (VERBS):
  this.doit = function(tx, ty)
  {
    // VERB: draw
    resetMatrix(); // COMMENT THIS OUT FOR SOME AWESOME SHIT
    translate(this.x, this.y);
    rotate(this.a);
    image(this.img, 0, 0, this.d, this.d);
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
