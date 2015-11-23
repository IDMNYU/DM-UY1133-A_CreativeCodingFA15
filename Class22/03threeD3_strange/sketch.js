// strange.js
//
// generate strange attractors according to random/evolved coefficients
//
// attractor is generated via:
//
//	X = sin(A*y)-z*cos(B*x)
//	Y = z*sin(C*x)-cos(D*y)
//	Z = E*sin(x)
//
var xrotate = 0;
var yrotate = 0;
var zrotate = 0;
var xr = 0;
var yr = 0;
var zr = 0;


var howbig = 5;

var A, B, C, D, E;

var howrandom = 100;

var positions = [];

function setup(){
  createCanvas(800, 600, WEBGL); // WEBGL!!!
  reset();
}

function draw(){
  background(255);
  resetMatrix();
  pointLight(255, 255, 255, mouseX, mouseY, 0);
  specularMaterial(255,0,0);
  camera(0, 0, 100);
  rotateX(xr);
  rotateY(yr);
  rotateZ(zr);
  

  for(var i =  0;i<positions.length;i++)
  {
    push();
    translate(positions[i].x, positions[i].y, positions[i].z);
    sphere(howbig); // argument is the diameter
    pop();
  }
  
  var x = positions[positions.length-1].x;
  var y= positions[positions.length-1].y;
  var z = positions[positions.length-1].z;
  
	var newx = sin(A*y)-z*cos(B*x)
	var newy = z*sin(C*x)-cos(D*y)
	var newz = E*sin(x)
	var pos = {};
	pos.x = newx;
  pos.y = newy;
	pos.z = newz;
	positions.push(pos);
 
 
  if(xrotate) xr+=.01;
  if(yrotate) yr+=.01;
  if(zrotate) zr+=.01;

 
}

function reset()
{
  A = random(-howrandom, howrandom);
  B = random(-howrandom, howrandom);
  C = random(-howrandom, howrandom);
  D = random(-howrandom, howrandom);
  E = random(-howrandom, howrandom);
  
  positions = [];
  var pos = {};
  pos.x = 0;
  pos.y = 0;
  pos.z = 0;
  positions.push(pos);
}

function keyTyped()
{
  if(key==' ') reset();
  if(key=='x') xrotate = 1-xrotate;
  if(key=='y') yrotate = 1-yrotate;
  if(key=='z') zrotate = 1-zrotate;
  
}