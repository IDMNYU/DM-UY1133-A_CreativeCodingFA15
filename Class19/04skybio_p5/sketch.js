var urltorecognize = 'http://static01.nyt.com/images/2015/11/07/us/07earned-web/07earned-web-master675.jpg';
var jsonstuff;
var img;

var lefteye_x, lefteye_y, righteye_x, righteye_y;

function preload()
{
  // LUKE'S KEYS:
  var skybio_id = 'e4cb0194a8864e69bfc2de040940138e';
  var skybio_secret = '32d3695ad88e46e196a08da881c26eb3';

  var url = 'http://api.skybiometry.com';
  url+='/fc/faces/detect.json?api_key='+skybio_id+'&api_secret='+skybio_secret;
  url+='&urls='+urltorecognize+'&attributes=all';
  
  jsonstuff = loadJSON(url);
  
  img = loadImage(urltorecognize);
}

function setup() {
  createCanvas(800,600);
	    lefteye_x = jsonstuff.photos[0].tags[0].eye_left.x/100.;
	    lefteye_y = jsonstuff.photos[0].tags[0].eye_left.y/100.;
	    righteye_x = jsonstuff.photos[0].tags[0].eye_right.x/100.;
	    righteye_y = jsonstuff.photos[0].tags[0].eye_right.y/100.;
	    console.log("left eye: " + lefteye_x + " " + lefteye_y);
	    console.log("right eye: " + righteye_x + " " + righteye_y);
}

function draw() {
  background(0);
  image(img, 0, 0);
  fill(255);
  ellipse(lefteye_x*img.width, lefteye_y*img.height, 20, 20);
  ellipse(righteye_x*img.width, righteye_y*img.height, 20, 20);
}