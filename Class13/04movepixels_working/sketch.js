// rules with the color() command
// if you give it one number, it's luminosity with a 255 alpha:
// color(128) -> medium grey, but completely opaque
// [128, 128, 128, 255]
// if you give it two numbers, it's luminosity and alpha
// color(192, 50) -> light grey, but mostly transparent
// [192, 192, 192, 50]
// if you give it three numbers, it's RGB with a 255 alpha:
// color(255, 255, 0) -> yellow, but completely opaque
// [255, 255, 0, 255]
// if you give it four numbers, it's RGBA:
// color(255, 0, 255, 100) -> magenta, kinda transparent
// [255, 0, 255, 100]

var howwide = 100;
var howtall = 100;
var img = new Array(2); // this is gonna store two images
var whichimage = 0;
function setup() {
  createCanvas(600, 600);
  img[0] = createImage(howwide, howtall);
  img[1] = createImage(howwide, howtall);
}
function draw() {
  background(0, 0, 255);
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = mouseX-20; i < mouseX+20; i++) {
    for (var j = mouseY-20; j < mouseY+20; j++) {
      // read red pixels from source image:
      var p0 = img[whichimage].get(i-1, j-1)[0]; // upper left
      var p1 = img[whichimage].get(i, j-1)[0]; // upper mid
      var p2 = img[whichimage].get(i+1, j-1)[0]; // upper right
      var p3 = img[whichimage].get(i-1, j)[0]; // left
      var p4 = img[whichimage].get(i, j)[0]; // center pixel
      var p5 = img[whichimage].get(i+1, j)[0]; // right
      var p6 = img[whichimage].get(i-1, j+1)[0]; // lower left
      var p7 = img[whichimage].get(i, j+1)[0]; // lower mid
      var p8 = img[whichimage].get(i+1, j+1)[0]; // lower right
      average = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/9.0;
     // write pixels into destination image:
      img[1-whichimage].set(i, j, color(average)); 
    }
  }
  img[1-whichimage].updatePixels(); // update pixels on destination

  whichimage = 1-whichimage; // flip source and destination
  image(img[whichimage], 0, 0, width, height); // draw the new source
}
function mouseReleased() // blow out the image with new stuff
{
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < img[whichimage].width; i++) {
    for (var j = 0; j < img[whichimage].height; j++) {
      var r = random(10)>8; // true or false?
      var thecolor = color(r*255);
      img[whichimage].set(i, j, thecolor);
      img[1-whichimage].set(i, j, thecolor);
    }
  }
  img[whichimage].updatePixels(); // update pixels
  img[1-whichimage].updatePixels(); // update pixels
}