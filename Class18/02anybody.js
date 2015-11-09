process.setMaxListeners(0); // set max throttle

// libraries
// this interfaces with instgram:
var ig = require('instagram-node-lib'); 

// this is all supporting crap:
var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var bn = require('bignumber.js');
var utf8 = require('utf8');

var personofinterest = ''; // who am i looking for?

var personofinterest_id = -1; // we have no idea

var stufftodownload = []; // these are gonna be the urls to download

var mt; // max tag for recursion

// OAUTH

// LUKE:
ig.set('client_id', '439d3971a6e2458b8c7cfe2adee46cce');
ig.set('client_secret', '4f9b25aeb37148c3966e1254303969aa');


process.argv.forEach(function (val, index, array) {
  if(index==2) personofinterest = val;
});

console.log("searching for " +  personofinterest);

// our order of actions:
// getuserid() is gonna figure out the numeric user id of the person we want to stalk.
// getrecent() is gonna find their recent posts based on their numeric user id
// downloadthestuff() is gonna download all of their recent images
// using downloadImage() as a helper function.

getuserid(); // kick off function

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
        stufftodownload.push(data[i].images.standard_resolution.url);
        downloadthestuff();
      }
    } 
  });

}

function downloadthestuff()
{
  // make a directory:
  mkdirp('./'+personofinterest, function(err) { 
    // path was created unless there was error
  });

  for(var i = 0;i<stufftodownload.length;i++)
  {
    var url = stufftodownload[i];
    var filename = url.substring(url.lastIndexOf('/')+1);
    downloadImage(url, filename); // download image
  }
}

// downloadImage(_url, _fn) - downloads the image at _url to the
// file in the "stuff" subfolder with the name _fn.
function downloadImage(_url, _fn)
{
  var request = https.get(_url,
    function(response) {
      if (response.statusCode === 200) {
        var file = fs.createWriteStream("./"+personofinterest+"/"+_fn);
        response.pipe(file);
    }
    // Add timeout.
    request.setTimeout(12000, function () {
      request.abort();
    });
  });
}

