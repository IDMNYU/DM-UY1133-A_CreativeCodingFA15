var foo = require('./lukeserver.js');
var server = foo.startServer(8080);
foo.debugServer(false);

// socket.io stuff:
var io = require('socket.io')(server);
// this runs when we connect:

io.on('connection', function (socket) {
	console.log('socket connection!!!');
  	socket.emit('news', { hello: 'world' }); // test message
    // when it gets a 'query' message, RUN INSTAGRAM:
  	socket.on('query', function (data) {
  		personofinterest = data;
    	getuserid(); // DO EVERYTHING
  });
});




// INSTAGRAM STUFF


// libraries
// this interfaces with instgram:
var ig = require('instagram-node-lib'); 

// this is all supporting crap:
var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var bn = require('bignumber.js');
var utf8 = require('utf8');

var personofinterest;
var personofinterest_id = -1; // we have no idea

var stufftoemit = []; // these are gonna be the urls to show in processing

// OAUTH

// LUKE:
ig.set('client_id', '439d3971a6e2458b8c7cfe2adee46cce');
ig.set('client_secret', '4f9b25aeb37148c3966e1254303969aa');

// our order of actions:
// getuserid() is gonna figure out the numeric user id of the person we want to stalk.
// getrecent() is gonna find their recent posts based on their numeric user id
// downloadthestuff() is gonna download all of their recent images
// using downloadImage() as a helper function.

function getuserid()
{
  ig.users.search({ 
    q: utf8.encode(personofinterest),
    complete: function(data, pagination) {
      for(var i  = 0;i<data.length;i++)
      {
        if(data[i].username==personofinterest) {
          console.log(personofinterest + ": " + data[i].id);
          personofinterest_id = data[i].id;
          getrecent(); // kick off next thing
        }
      }
    } 
  });
}

function getrecent()
{
  ig.users.recent({ 
    user_id: personofinterest_id,
    complete: function(data, pagination) {
      for(var i = 0;i<data.length;i++) {
        console.log(i + ": " + data[i].images.standard_resolution.url);
        stufftoemit.push(data[i].images.standard_resolution.url);
      }
      io.emit('images', stufftoemit); // transmit to client
    } 
  });

}

