console.log("lukeserver v.0.1!!!!");
console.log("it slices. it dices.");
console.log();

// lukeserver.js -> serves up web stuff, opens an arduino, does your taxes...

// THIS STUFF IS ABOUT THE STATIC HTTP SERVER:
// includes the http node library and makes an object using it:
var http = require('http'); 
// includes the filesystem node library and makes an object using it:
var fs = require('fs');
var path = require('path'); // Use the path module
var mime = require('mime'); // ...and the MIME module

//
// THIS CREATES THE SERVER - when stuff comes in call webrequest()
// this is really important!!!
var server = http.createServer(webrequest);


// THIS STUFF IS ABOUT THE SERIAL PORT:
var com = require('serialport'); // this is the serial object
var serialPort; // this will talk to the serial port

// THIS STUFF IS ABOUT WHETHER WE WANT THINGS PRINTED OR NOT:
var WEBDEBUG = false; // debug?
var SERIALDEBUG = false; // debug?

// this runs when you do the stuff
function webrequest(request, response)
{
	// what is the client asking for?:
	if(WEBDEBUG) console.log("\nrequest URL: " + request.url);

	// STAGE 1:
	// dervice a filename based on the request
	// this is all SERVER stuff:
	var filePath = __dirname+request.url; // start out with the directory path

	if(fs.existsSync(filePath)&&fs.statSync(filePath).isDirectory()) 
	{
		filePath+='index.html'; // add index.html to directory requests
	}
	if(WEBDEBUG) ;
	console.log("resolved to file: " + filePath);

	// STAGE 2:
	// use node mime to figure out what kind of file we're asking for:
	var contentType = mime.lookup(filePath);

	// STAGE 3:
	// try to open this file on the SERVER and 
	// feed it to the web CLIENT:

	// outer loop is see if the file exists...
	fs.exists(filePath,
		// run function if file exists:
		function(exists) {
			// file exists...
			if (exists) {
				// read the file...
				fs.readFile(filePath,
					// run function based on reading the file... 
					function(error, content) {
						// something went wrong (trigger 500)...
						if (error) {
							response.writeHead(500);
							response.end();
						}
						// everything is OKAY... send the file to the CLIENT.
						else {
							response.writeHead(200, { 'Content-Type': contentType });
							response.end(content, 'utf-8');
						}
					}
				);
			}
			// file doesn't exist (trip 404)...
			else {
				response.writeHead(404, { 'Content-Type': 'text/html'});
				response.end('<html><body><b>sorry.</b>  <i>no file.</i></body></html>');
			}
		}
		// end of function that runs if file exists
	);

}


function startServer(_port) { 
	if(_port==undefined) _port = 8080; // default to 8080
	// listen on the localhost
	server.listen(_port);
	// print out that we're up and running:
	if(WEBDEBUG) console.log('\nserver running on port ' + _port + '!!!!');
	return(server);
};

function stopServer() {
	server.close();
	if(WEBDEBUG) console.log('\nserver stopped.');
}

function debugServer(_state)
{
	WEBDEBUG = _state;
}



// require.js stuff:
module.exports.startServer = startServer;
module.exports.stopServer = stopServer;
module.exports.debugServer = debugServer;

