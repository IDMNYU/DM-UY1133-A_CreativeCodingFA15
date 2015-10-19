
var threshold = 128;
var howwide = 100;
var howtall = 100;
var img = new Array(2); // this is gonna store two images
var whichimage = 0;
function preload() {
  img[0] = loadImage('./data/bernie.png');
  img[1] = loadImage('./data/bernie.png');
}
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(0, 0, 255);
  img[whichimage].loadPixels(); // load pixels into memory
  img[1-whichimage].loadPixels(); // load pixels into memory
  for (var i = 0; i < howwide; i++) {
    for (var j = 0; j < howtall; j++) {
      // read red pixels from source image:
      var p0 = img[whichimage].get(i-1, j-1); // upper left
      var p1 = img[whichimage].get(i, j-1); // upper mid
      var p2 = img[whichimage].get(i+1, j-1); // upper right
      var p3 = img[whichimage].get(i-1, j); // left
      var p4 = img[whichimage].get(i, j); // center pixel
      var p5 = img[whichimage].get(i+1, j); // right
      var p6 = img[whichimage].get(i-1, j+1); // lower left
      var p7 = img[whichimage].get(i, j+1); // lower mid
      var p8 = img[whichimage].get(i+1, j+1); // lower right

      //var avgr = (p0[0]+p1[0]+p2[0]+p3[0]+p4[0]+p5[0]+p6[0]+p7[0]+p8[0])/9.;
      //var avgg = (p0[1]+p1[1]+p2[1]+p3[1]+p4[1]+p5[1]+p6[1]+p7[1]+p8[1])/9.;
      //var avgb = (p0[2]+p1[2]+p2[2]+p3[2]+p4[2]+p5[2]+p6[2]+p7[2]+p8[2])/9.;

      var avgr = (p0[0]+p8[0])/2.;
      var avgg = (p3[0]+p5[1])/2.;
      var avgb = (p2[2]+p6[2])/2.;

      // write pixels into destination image:
      img[1-whichimage].set(i, j, color(avgr, avgg, avgb)); 
    }
  }
  img[1-whichimage].updatePixels(); // update pixels on destination

  whichimage = 1-whichimage; // flip source and destination
  image(img[whichimage], 0, 0, width, height); // draw the new source
}
function mouseDragged()
{
}
function keyReleased() // blow out the image with new stuff
{
}