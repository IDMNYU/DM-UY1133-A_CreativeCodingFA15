
var whichdamnshape = 0;
var xrotate = 0;
var yrotate = 0;
var zrotate = 0;
var xr = 0;
var yr = 0;
var zr = 0;

var howbig = 200;

// draw a sphere with radius 200
function setup(){
  createCanvas(800, 600, WEBGL); // WEBGL!!!
  perspective(60 / 180 * PI, width/height, 0.1, 100);
}

function draw(){
  camera(0, 0, map(mouseY, 0, height, -1000, 1000));
  background(255);
  //orbitControl(); // this does weird stuff with the mouse and the camera
  rotateX(xr);
  rotateY(yr);
  rotateZ(zr);

  //resetMatrix();
  //translate(-100, -100, 0);
  switch(whichdamnshape) {
    case 0:
      sphere(howbig); // argument is the diameter
      break;
    case 1: 
      plane(howbig, howbig);
      break;
    case 2:
      cylinder(howbig, howbig);
      break;
    case 3:
      cone(howbig, howbig);
      break;
    case 4:
      torus(howbig, howbig/2);
      break;
    case 5:
      box(howbig, howbig, howbig/2); // x, y, z
      break;
  }

  if(xrotate) xr+=.01;
  if(yrotate) yr+=.01;
  if(zrotate) zr+=.01;




}

function keyTyped()
{
  if(key==' ') whichdamnshape = (whichdamnshape+1) % 6;
  if(key=='x') xrotate = 1-xrotate;
  if(key=='y') yrotate = 1-yrotate;
  if(key=='z') zrotate = 1-zrotate;
  
}