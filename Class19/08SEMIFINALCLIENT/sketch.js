
// these are variables holding DOM elements:
var inputfield, button;

// create a canvas object:
var canvas;

var socket; // this is the network pipe

var img = new Array(20);
var posx = new Array(20);
var posy = new Array(20);

function setup(){
  socket = io(); // this starts the network connection

  // this happens later:
  socket.on('images', function(data) {
    img = new Array(data.length);
    posx = new Array(data.length);
    posy = new Array(data.length);
    for(var i =  0;i<img.length;i++)
    {
      // we could check here to see if the image downloads:
      img[i] = loadImage(data[i]); 
      posx[i] = random(width);
      posy[i] = random(height);
    }
  });

  // make a canvas:
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
      image(img[i], posx[i], posy[i], img[i].width/4, img[i].height/4);
      posx[i] = posx[i] + random(-25, 25);
      posx[i] = posy[i] + random(-25, 25);
    }
  }
}

function queryEntered(){
  console.log('value: ' + inputfield.value());
  socket.emit('query', inputfield.value());
}