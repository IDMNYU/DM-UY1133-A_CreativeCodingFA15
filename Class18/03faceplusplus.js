process.setMaxListeners(0); // set max throttle

var urltodownload = ''; // who am i looking for?

// OAUTH

// LUKE:
ig.set('client_id', '9b987607731a52354f200e6f0249f622');
ig.set('client_secret', 'grcK2TNCZHzJT_3V7raz62w62UE262SB');

url_endpoint = 'apius.faceplusplus.com';

process.argv.forEach(function (val, index, array) {
  if(index==2) urltodownload = val;
});

console.log("searching for " +  urltodownload);

getfacestuff(); // kick off function

function getfacestuff()
{
}
