var light = 0;
var sound = 0;
var gx = 0;
var gy = 0;
var gz = 0;

var posx, posy;

var soundmin = 10000000000000;
var soundmax = -10000000000000;

var socket;

function setup() {
  createCanvas(800, 600);
  background(0);

  posx = width/2;
  posy = height/2;

  socket = io();
  socket.on('data',
    function(data) {
      var newlight = map(parseInt(data[0]), 170, 400, 0., 1.); // 0-1 is always a good move
      light = 0.1*newlight + 0.9*light; // smoothing
      var newsound = parseInt(data[1]);
      if(newsound < soundmin) soundmin=newsound;
      if(newsound > soundmax) soundmax=newsound;
      newsound = map(newsound, soundmin, soundmax, 0., 1.); // 0-1 is always a good move

      if(!isNaN(newsound)) sound = 0.9*sound + 0.1*newsound; // smoothing
      gx = parseInt(data[2]);
      gy = parseInt(data[3]);
      gz = parseInt(data[4]);
    }
  );

  background(255);
}

function draw() {
	//background(light*255.);
  fill(255, 255, 0);
  ellipse(posx, posy, sound*50., sound*50.);

  posx+=(gx*.01);
  posy+=(gy*.01);
  if(posx>width) posx=0;
  if(posx<0) posx=width;
  if(posy>height) posy=0;
  if(posy<0) posy=height;
 
}

function keyReleased()
{
  background(255);
}