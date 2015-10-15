// includes the http node library and makes an object using it:
var http = require('http'); 

// includes the filesystem node library and makes an object using it:
var fs = require('fs');

// this creates the server - when stuff comes in call dothestuff()
// listen on port 8080 on the localhost
http.createServer(dothestuff).listen(8080);

// this runs when you do the stuff
function dothestuff(request, response)
{
	// hard-coded to read the index.html
	// from the directory where the js lives (__dirname)
	fs.readFile(__dirname + '/index.html',
		function(err, data) {
			if(err) { // this means we screwed up on the SERVER SIDE
				response.writeHead(500); // bad mojo
				return response.end('oops!  index.html went missing.');
			}

			// print out LOCAL
			console.log("THE STUFF IN HEX:");
			console.log(data); // this will show you binary crap
			console.log("THE STUFF IN UTF-8:");
			console.log(data.toString()); // this will show you the real stuff

			// send to web client
			response.writeHead(200, {'Content-Type': 'text/html'});
		  	response.end(data);
		});
}

// print out that we're up and running:
console.log('Server running on port 8080/ !!!!!');
