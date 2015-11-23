
var whichdamnshape = 0;
var xrotate = 0;
var yrotate = 0;
var zrotate = 0;
var xr = 0;
var yr = 0;
var zr = 0;

// draw a sphere with radius 200
function setup(){
  createCanvas(800, 600, WEBGL); // WEBGL!!!
}

function draw(){
  background(255);
  rotateX(xr);
  rotateY(yr);
  rotateZ(zr);

  //resetMatrix();
  //translate(-100, -100, 0);
  switch(whichdamnshape) {
    case 0:
      sphere(200); // argument is the diameter
      break;
    case 1: 
      plane(200, 200);
      break;
    case 2:
      cylinder(200, 200);
      break;
    case 3:
      cone(200, 200);
      break;
    case 4:
      torus(200, 60);
      break;
    case 5:
      box(200, 200);
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