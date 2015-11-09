
var urltorecognize = ''; // who am i looking for?

var http = require('http'); // this is the object that does the work

// LUKE'S KEYS:
var skybio_id = 'e4cb0194a8864e69bfc2de040940138e';
var skybio_secret = '32d3695ad88e46e196a08da881c26eb3';

var main_url = 'api.skybiometry.com';
var url_endpoint = '/fc/faces/detect.json?api_key='+skybio_id+'&api_secret='+skybio_secret;

// look at command line arguments:
process.argv.forEach(function (val, index, array) {
  if(index==2) urltorecognize = val;
});

console.log("searching for " +  urltorecognize);

getfacestuff(); // kick off function

function getfacestuff()
{
	url_endpoint+='&urls='+urltorecognize+'&attributes=all';
	console.log('URL_ENDPOINT:');
	console.log(url_endpoint);

	var options = {
		host: main_url,
		port: 80,
		path: url_endpoint,
		method: 'POST'
	};

	var req = http.request(options, function(res) {
	  //console.log('STATUS: ' + res.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (stuff) {
	    console.log('BODY:');
	    var jsonstuff = JSON.parse(stuff);
	    var lefteye_x = jsonstuff.photos[0].tags[0].eye_left.x;
	    var lefteye_y = jsonstuff.photos[0].tags[0].eye_left.y;
	    var righteye_x = jsonstuff.photos[0].tags[0].eye_right.x;
	    var righteye_y = jsonstuff.photos[0].tags[0].eye_right.y;
	    console.log("left eye: " + lefteye_x + " " + lefteye_y);
	    console.log("right eye: " + righteye_x + " " + righteye_y);
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body:
	req.write('data\n');
	req.end();

}
