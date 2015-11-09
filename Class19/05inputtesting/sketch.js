
// these are variables holding DOM elements:
var inputfield, button;

// create a canvas object:
var canvas;

var socket;

var img = new Array(20);
var posx = new Array(20);
var posy = new Array(20);

function setup(){
  socket = io();

  socket.on('images', function(data) {
    img = new Array(data.length);
    posx = new Array(data.length);
    posy = new Array(data.length);
    for(var i =  0;i<img.length;i++)
    {
      img[i] = loadImage(data[i]);
      posx[i] = random(width);
      posy[i] = random(height);
    }
  });

  canvas = createCanvas(800, 600);
  canvas.position(0, 110);
  // make an input field:
  inputfield = createInput('');
  inputfield.position(50, 50); // move it around
  // make a button:
  button = createButton('click me');
  button.position(50, 80);
  button.mousePressed(queryEntered); // callback
}

function draw()
{
  background(255);
  //socket.emit('crap', random());
  for(var i = 0;i<img.length;i++)
  {
    if(img[i]) {
      image(img[i], posx[i], posy[i]);
      posx[i] = posx[i] + random(-5, 5);
      posx[i] = posy[i] + random(-5, 5);
    }
  }
}

function queryEntered(){
  console.log('value: ' + inputfield.value());
  socket.emit('query', inputfield.value());
}