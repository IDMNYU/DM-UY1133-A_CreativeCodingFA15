// this generates a 'cooked text file'

var alicelines; // this is gonna hold the text file

function preload() {
  // ignore the bullshit error that happens when you do this:
  alicelines = loadStrings('./data/aliceinwonderland.txt');
}

function setup() {

  var bigstring = ""; // the WHOLE BOOK in one HUGE STRING
  // concatenate whole book into one string:
  for (var i = 0; i<alicelines.length; i++)
  {
    bigstring+=alicelines[i]+" ";
  }
  
  // this is how this works:
  // bigstring = bigstring.replaceAll(/rabbit/, "fox");
  
  // strip all punctuation (regex)
  bigstring = bigstring.replace(/[^a-zA-Z0-9' ]/g, " ");

  // fix apostrophe catastrophe
  bigstring = bigstring.replace(/ '/g, " ");
  bigstring = bigstring.replace(/' /g, " ");
  
  // move to lowercase
  bigstring = bigstring.toLowerCase();

  // strip leading and extra whitespace (regex)
  bigstring = bigstring.replace(/ +/g, " ");
  bigstring = bigstring.trim();

  // view:
  //console.log(bigstring);

  var chapters = bigstring.split(/chapter [a-z]+/);
  // how many chapters?
  console.log(chapters[1]);
  
  // one last strip of whitespace
  for(var i = 0;i<chapters.length;i++)
  {
    chapters[i] = chapters[i].trim();
  }

  // step 4: output a "cooked" text file
  // write line-by-line, trimming leading and trailing space
  saveStrings(chapters, 'alice_cooked.txt');

}

function draw() {
}
