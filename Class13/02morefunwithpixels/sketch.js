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

var img; // this is gonna store an image
function setup() {
  createCanvas(600, 600);
  img = createImage(100, 100);
}
function draw() {
  background(0, 0, 255);
  img.loadPixels(); // load pixels into memory
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      var thepixel = img.get(i,j);
      thepixel[0]--; // fade the red
      thepixel[1]--; // fade the green
      thepixel[2]--; // fade the blue
      thepixel[3]--; // fade the alpha
      img.set(i, j, thepixel);
    }
  }
  img.updatePixels(); // update pixels
  image(img, 0, 0, width, height); // draw the image
}
function mouseReleased() // blow out the image with new stuff
{
  img.loadPixels(); // load pixels into memory
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      var r = random(10)>8; // true or false?
      var thecolor = color(r*255);
      img.set(i, j, thecolor);
    }
  }
  img.updatePixels(); // update pixels
}