process.setMaxListeners(0); // set max throttle

// libraries
var ig = require('instagram-node-lib');
var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var bn = require('bignumber.js');
var utf8 = require('utf8');

var wordtosearch = 'telephone'; // what are you searching for?
//var wordtosearch = 'غروب'; // what are you searching for?
//var wordtosearch = '일몰';

var mt; // max tag for recursion

// OAUTH

// LUKE:
ig.set('client_id', '439d3971a6e2458b8c7cfe2adee46cce');
ig.set('client_secret', '4f9b25aeb37148c3966e1254303969aa');


// Date(year, month, day, hours, minutes, seconds, milliseconds);

// noon and 1pm on january 1, 2015
// months are 0 based (0-11), days are NOT (1-31), hours are 24-hour

// this is the earliest image you want to download:
var startDate = Math.floor(new Date(2015, 5, 1, 0, 0, 0, 0).getTime()/1000.);
// this is the latest image you want to download:
var endDate = Math.floor(new Date(2015, 6, 15, 0, 0, 0, 0).getTime()/1000.);
// (the downloading will happen backwards - endDate to startDate)

var absminID, absmaxID; // lowest and highest ID to search for

// print shit to feel good:
console.log("start date: " + startDate);
console.log("end date: " + endDate);

getMinID(); // START IT GOING

// getMinID() - find the instagram ID # of the 
// instagram user at the mall in thailand 
// closest in time to startDate.
//
// that value will be stashed in absminID.
// 
// then it will fire getMaxID().
function getMinID()
{
  ig.media.search({
    min_timestamp: startDate-(60*60*24),
    max_timestamp: startDate,
    // mall in bangkok
    lat: 13.7464,
    lng: 100.5350,
    distance: 5000,
    complete: function(data, pagination){
      absminID = new bn(data[0].id.split('_')[0]); // use short form IDs
      getMaxID();
    }
  });
}

// getMaxID() - find the instagram ID # of the 
// instagram user at the mall in thailand 
// closest in time to endDate.
//
// that value will be stashed in absmaxID.
// 
// then it will fire printID().
function getMaxID()
{
  ig.media.search({
    min_timestamp: endDate-(60*60*24),
    max_timestamp: endDate,
    // mall in bangkok
    lat: 13.7464,
    lng: 100.5350,
    distance: 5000,
    complete: function(data, pagination){
      absmaxID = new bn(data[0].id.split('_')[0]); // use short form IDs
      printID();
    }
  });
}

// printID()) - prints the instagram IDs that closest
// correspond to startDate and endDate.
//
// it also makes the search string directory.
// 
// then it will fire getIG() to start the actual image search.
function printID()
{
  console.log("start ID: " + absminID);
  console.log("end ID: " + absmaxID);

  mkdirp('./'+wordtosearch, function(err) { 
    // path was created unless there was error
  });

  mt = new bn(absmaxID);
  getIG();
}

// getIG()) - start searching instagram based on
// absmaxID and absminID and the search term ('wordtosearch').
//
// it will paginate through automatically, downloading all images
// that fit between startDate and endDate.
//
// when it's done, it will say so and take a while to flush
// while all the download threads have time to finish.
// 
// then the app will exit.
function getIG()
{
  ig.tags.recent({
    name: utf8.encode(wordtosearch), // term to search
    count: 100, // 100 images per page
    max_tag_id: mt.toString(), // starting ID (based on the bangkok mall)
    complete: function(data, pagination){
      console.log("highest ID should be: " + mt);
      console.log("first ID on page: " + data[0].id);
      // debug: find out the date of this page:
      var pagedate = new Date(data[0].created_time*1000);
      console.log("page date: " + data[0].created_time + ". " + pagedate.toUTCString());
      for(var i = 0;i<data.length;i++)
      {
        var ts = data[i].created_time;
        if(ts>startDate && ts<endDate) {
          // only download images between dates:
          var url = data[i].images.standard_resolution.url;
          var filename = url.substring(url.lastIndexOf('/')+1);
          downloadImage(url, filename); // download image
        }
      }
        console.log("mt:          " + mt);
        console.log("min id:      " + absminID);
        console.log("diff:        " + mt.minus(absminID));
        var next_id = new bn(pagination.next_max_tag_id);
      if(mt.equals(next_id) || !pagination.next_max_tag_id || mt.lessThan(absminID)) {
        console.log("DONE!!!");
        // will pause to clean up
      }
      else {
        mt = new bn(pagination.next_max_tag_id);
        getIG();
      }
    }
  });
}

// downloadImage(_url, _fn) - downloads the image at _url to the
// file in the "stuff" subfolder with the name _fn.
function downloadImage(_url, _fn)
{
        //console.log(_url);
        var request = https.get(_url, function(response) {
          if (response.statusCode === 200) {
            var file = fs.createWriteStream("./"+wordtosearch+"/"+_fn);
            response.pipe(file);
          }
          // Add timeout.
          request.setTimeout(12000, function () {
            request.abort();
          });
        });
}

