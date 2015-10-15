//
// serial stuff - read from arduino
//

var thestuff = "";

var portname = '/dev/cu.usbmodem1411'; // luke's arduino

// npm install serialport
var com = require('serialport'); // this is the serial object

var serialPort = new com.SerialPort(portname, {
	baudrate: 9600,
	parser: com.parsers.readline('\r\n')
});

// start cookin'
serialPort.on('open', function() {
	console.log('SERIAL PORT OPENED!!!!!');
});

// data is coming in
serialPort.on('data', function(data) {
	thestuff = data;
	console.log(data); // this our feel good move
});




// includes the http node library and makes an object using it:
var http = require('http'); 

// this creates the server - when stuff comes in call dothestuff()
// listen on port 8080 on the localhost
http.createServer(dothestuff).listen(8080);

// this runs when you do the stuff
function dothestuff(request, response)
{
  console.log("connection!"); // this will print out LOCALLY
  console.log(request.url); // what is being asked for?

  // the header has a code and MIME type; send to client
  response.writeHead(200, {'Content-Type': 'text/html'});

  // this is the content being sent to the web client
  response.end('<html><body><b>'+thestuff+'</b></body></html>');
}

// print out that we're up and running:
console.log('Server running at port 8080/ !!!!!');
