// CONWAY'S GAME OF LIFE
// http://en.wikipedia.org/wiki/Conway's_Game_of_Life
//
// this p5 sketch implements John Conway's Game of Life simulation
// as an image-processing system... it looks at pixels in an image
// and treats them as cells in a version of Conway's simulation.
//
// your tasks:
// (1) make this thing look more interesting... 
// hint: you don't have to display the image directly to the screen.
// another hint: you can draw other things (text, shapes, etc.) instead of the cells.
// (2) the RULES in the draw() loop determine how the simulation decides to keep a pixel
// alive or generate a new one from a dead pixel.  this rule set is sometimes referred to as
// B3/S23 (a pixel is "Born" with 3 neighbors and "Stays Alive" with 2 or 3 neighbors.
// tweak these rules and see if you can find other interesting (or self-sustaining) systems.
//

var threshold = 128;
var howwide = 50;
var howtall = 50;
var img = new Array(2); // this is gonna store two images
var whichimage = 0;

function setup() {
  createCanvas(600, 600);
  img[0] = createImage(howwide, howtall);
  img[1] = createImage(howwide, howtall);
  noSmooth(); // don't smooth anything
  randomize();
}

function draw() {
  background(0, 0, 255, 10);
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < howwide; i++) {
    for (var j = 0; j < howtall; j++) {
      // read pixels from source image...
      // everything is b&w, so the red (array index 0) channel is fine:
      var p0 = img[whichimage].get(i-1, j-1)[0]>threshold; // upper left
      var p1 = img[whichimage].get(i, j-1)[0]>threshold; // upper mid
      var p2 = img[whichimage].get(i+1, j-1)[0]>threshold; // upper right
      var p3 = img[whichimage].get(i-1, j)[0]>threshold; // left
      var p4 = img[whichimage].get(i, j)[0]>threshold; // center pixel
      var p5 = img[whichimage].get(i+1, j)[0]>threshold; // right
      var p6 = img[whichimage].get(i-1, j+1)[0]>threshold; // lower left
      var p7 = img[whichimage].get(i, j+1)[0]>threshold; // lower mid
      var p8 = img[whichimage].get(i+1, j+1)[0]>threshold; // lower right
      var neighbors = p0+p1+p2+p3+p5+p6+p7+p8; // how many neighbors are alive?
      var result;
      
      // THESE ARE THE RULES FOR THE SIMULATION - 
      // by default, an alive cell stays alive if it has 2 or 3 live neighbors.
      // a dead cell becomes alive if it has three live neighbors.
      if(p4==1) // center pixel is alive
      {
        // if two or three live neighbors, keep alive; otherwise die.
        if(neighbors==2 || neighbors==3) result = 1; else result = 0;
      }
      else // center pixel is DEAD
      {
        // if exactly three live neighbors, become alive; otherwise stay dead.
        if(neighbors==3) result = 1; else result = 0;
      }
     // write pixels into destination image, scaled to 0 or 255:
      img[1-whichimage].set(i, j, color(result*255), color(result*255)); 
    }
  }
  img[1-whichimage].updatePixels(); // update pixels on destination

  whichimage = 1-whichimage; // flip source and destination
  image(img[whichimage], 0, 0, width, height); // draw the new source
}

function mouseClicked()
{
  fillatmouse();
}

function mouseDragged()
{
  fillatmouse();
}

function keyReleased() // blow out the image with new stuff
{
  randomize();
}

// this completely recreates the simulation with binary noise (cells are on or off)
function randomize()
{
  var randthresh = 8; // 80% of pixels will be dead.
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < img[whichimage].width; i++) {
    for (var j = 0; j < img[whichimage].height; j++) {
      var r = random(10)>randthresh; // true or false?
      var thecolor = color(r*255);
      img[whichimage].set(i, j, thecolor, thecolor);
      img[1-whichimage].set(i, j, thecolor, thecolor);
    }
  }
  img[whichimage].updatePixels(); // update pixels
  img[1-whichimage].updatePixels(); // update pixels

}

// set a pixel at the mouse position to ON
function fillatmouse()
{
  img[whichimage].loadPixels();
  var thex = floor(mouseX/(width/howwide));
  var they = floor(mouseY/(height/howtall));
  img[whichimage].set(thex, they, color(255));
  img[whichimage].updatePixels();
}