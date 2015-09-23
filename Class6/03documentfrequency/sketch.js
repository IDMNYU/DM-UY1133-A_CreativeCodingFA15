
var jane; // this is gonna hold the text file

var thechapter; // this is gonna hold the current chapter

var thefont;

var currentchapter = 0;

var documentfrequency = {}; // initialize JSON


function preload() {
  // ignore the bullshit error that happens when you do this:
  jane = loadStrings('./data/austin_cooked.txt');
  thefont = loadFont('./data/font1.otf'); // loads a font from the disk
}

function setup() {
  createCanvas(800, 600);
  textFont(thefont, 18);
  doDF(); // figure out the words counts for the whole damn thing
}

function draw() {
  background(255);
}

function keyReleased()
{
  currentchapter = (currentchapter+1)%jane.length;
  thechapter=jane[currentchapter].split(' '); // individual words
}

function doDF() // compute the document frequency
{
  for(var i = 0;i<jane.length;i++) // go thru each chapter
  {
    thechapter=jane[i].split(' '); // individual words
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
    
    if(documentfrequency[i]<10) console.log(i + ": " + documentfrequency[i]);
  }


}