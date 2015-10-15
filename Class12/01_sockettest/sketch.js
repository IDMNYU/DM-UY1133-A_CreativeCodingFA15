var c = 0;
var d = 0;

var socket;

function setup() {
  createCanvas(800, 600);
  background(0);

  socket = io();
  socket.on('data',
    function(data) {
      // Draw a blue circle
      c = parseInt(data[0]);
      d = parseInt(data[1]);
    }
  );
}

function draw() {
	background(d);
  textSize(c/10);
	fill(255);
	text(c, width/2, height/2);
  
}