
var alice; // this is gonna hold the text file

var thewords = new Array();
var thechain = {}; // new JSON

var thecurrentword = 'rabbit';

var xpos = 20;
var ypos = 30;

function preload() {
  // ignore the bullshit error that happens when you do this:
  alice = loadStrings('./data/alice_cooked.txt');
}

function setup() {
  createCanvas(800, 600);
  frameRate(4);

  var bigstring = ""; // the WHOLE BOOK in one HUGE STRING
  // concatenate whole book into one string:
  for (var i = 0; i<alice.length; i++)
  {
    bigstring+=alice[i]+" ";
  }
  thewords = bigstring.split(' ');

  domarkov();
}

function draw() {
  //background(255);
  textSize(32);
  console.log(thecurrentword);
  text(thecurrentword, xpos, ypos);
  xpos = xpos + textWidth(thecurrentword + ' ');
  if(xpos>width)
  {
    xpos = 20;
    ypos = ypos + 36;
  }
  if(ypos>height) {
    background(255);
    ypos = 30;
  }
  thecurrentword = pickword(thecurrentword);
}



function pickword(n)
{
  var pick = floor(random(0, thechain[n].length));
  return(thechain[n][pick]);
}

function domarkov()
{
  for(var i = 0;i<thewords.length;i++)
  {
    if(!thechain[thewords[i]]) { // isn't there yet
        //console.log(thewords[i] + " ain't there yet... adding... " + thewords[(i+1)%thewords.length]);
        thechain[thewords[i]] = new Array();
        thechain[thewords[i]][0] = thewords[(i+1)%thewords.length];
      }
      else { // it's there already
        thechain[thewords[i]].push(thewords[(i+1)%thewords.length]);
        //console.log("adding " + thewords[(i+1)%thewords.length] + " to " + thewords[i]);
      }
  }
}


