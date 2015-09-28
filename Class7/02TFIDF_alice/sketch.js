
var alice; // this is gonna hold the text file

var thechapter; // this is gonna hold the current chapter

var thefont; // what font are we using?

var currentchapter = 0; // what chapter are we on?

var documentfrequency = {}; // initialize JSON for the documents

var termfrequency = {}; // JSON for the terms

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
  
  var thresh = 1.0-(mouseY/height);

  text(currentchapter + ": " + thresh, 20, 20);
  
  var xpos = 20;
  var ypos = 50;
  
  for(i in termfrequency)
  {
    if(termfrequency[i]>=thresh)
    {
      tw = textWidth(i+' ');
      if(xpos+tw>width)
      {
        xpos = 20;
        ypos = ypos+20;
      }
      text(i, xpos, ypos);
      xpos = xpos + tw;
    }
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