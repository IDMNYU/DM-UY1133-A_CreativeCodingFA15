
var alice; // this is gonna hold the text file

var thechapter; // this is gonna hold the current chapter

var thefont; // what font are we using?

var currentchapter = 0; // what chapter are we on?

var documentfrequency = {}; // initialize JSON for the documents

var termfrequency = {}; // JSON for the terms

var thresh = 1.0; // TFIDF threshold

var b = 0.9; // how SMOOTH do we move (% of previous output)
var a = 1.0-b; // how SMOOTH do we move (% of input)
var thereness = 0.1; // how close to there is there


var wordlist = new Array(); // unsized
var xpos = new Array();
var ypos = new Array();
var xpos_t = new Array();
var ypos_t = new Array();
var tsize = new Array();

function preload() {
  // ignore the bullshit error that happens when you do this:
  alice = loadStrings('./data/alice_cooked.txt');
  thefont = loadFont('./data/font1.otf'); // loads a font from the disk
}

function setup() {
  createCanvas(800, 600);
  textFont(thefont, 18);
  textSize(18);
  doDF(); // figure out the words counts for the whole damn thing
  doTF(currentchapter); // figure out the TFIDF
  
}

function draw() {
  background(255);
  
  for(var i = 0;i<wordlist.length;i++)
  {
    resetMatrix();
    rotate(random(-0.003, 0.003));
    textSize(tsize[i]);
    text(wordlist[i], xpos[i], ypos[i]);
    
    // smooth the animation based on:
    // y(n) = ax(n) + by(n-1) {a+b=1}
    // first order recursive lowpass filter
    // IIR - infinite impulse response:
    xpos[i] = a*xpos_t[i] + b*xpos[i];
    ypos[i] = a*ypos_t[i] + b*ypos[i];
    if(abs(xpos_t[i]-xpos[i])<thereness&&abs(ypos_t[i]-ypos[i])<thereness)
    {
      // you're close to there
      // pick a new there to be there
      xpos_t[i] = random(0, width);
      ypos_t[i] = random(0, height);
    }
    tsize[i] = tsize[i]+1;
    if(tsize[i]>32) tsize[i]=9;
  }
}

function keyReleased()
{
  currentchapter = (currentchapter+1) % alice.length;
  doTF(currentchapter); // figure out the TFIDF
}

function doTF(c)
{
  termfrequency = {}; // blow out the brains of the TF
  var chapter = alice[c].split(' '); // individual words
  for(var i = 0;i<chapter.length;i++)
  {
      if(termfrequency.hasOwnProperty(chapter[i]))
      {
        // the word is already in the data structure
        termfrequency[chapter[i]]++;
      }
      else
      {
        termfrequency[chapter[i]]=1;
      }    
  }
  
  for(i in termfrequency)
  {
    termfrequency[i] = termfrequency[i]/documentfrequency[i];
    //console.log(i + ": " + termfrequency[i]); // test
  }
  
  
  // get me a word list
  
  // blow out the brains on the data so far:
  wordlist = new Array(); // unsized
  
  for(i in termfrequency)
  {
    if(termfrequency[i]>=thresh)
    {
      wordlist.push(i);
    }
  }
  xpos = new Array(wordlist.length);
  ypos = new Array(wordlist.length);
  xpos_t = new Array(wordlist.length);
  ypos_t = new Array(wordlist.length);
  tsize = new Array(wordlist.length)
  
  for(var i = 0;i<wordlist.length;i++)
  {
    xpos[i] = random(0, width);
    ypos[i] = random(0, height);
    xpos_t[i] = random(0, width);
    ypos_t[i] = random(0, height);
    tsize[i] = random(9, 32);
  }
  
  
  console.log("we have " + wordlist.length + " words!");

}

function doDF() // compute the document frequency
{
  for(var i = 0;i<alice.length;i++) // go thru each chapter
  {
    thechapter=alice[i].split(' '); // individual words
    for(var j = 0;j<thechapter.length;j++) // go thru each word in the chapter
    {
      if(documentfrequency.hasOwnProperty(thechapter[j]))
      {
        // the word is already in the data structure
        documentfrequency[thechapter[j]]++;
      }
      else
      {
        documentfrequency[thechapter[j]]=1;
      }
    }
  }
  
  for(i in documentfrequency)
  {
    //console.log(i + ": " + documentfrequency[i]); // test
    
    //if(documentfrequency[i]<10) console.log(i + ": " + documentfrequency[i]);
  }


}


function mousePressed()
{
    for(var i = 0;i<wordlist.length;i++)
  {
    xpos_t[i] = random(0, width);
    ypos_t[i] = random(0, height);
  }
  
}