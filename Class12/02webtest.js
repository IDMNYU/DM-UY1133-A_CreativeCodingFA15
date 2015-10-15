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
  response.end('<html><body><b>Hello</b> <i>World</i></body></html>');
}

// print out that we're up and running:
console.log('Server running at port 8080/ !!!!!');
