// this generates a 'cooked text file'

var alicelines; // this is gonna hold the text file

function preload() {
  // ignore the bullshit error that happens when you do this:
  alicelines = loadStrings('./data/aliceinwonderland.txt');
  
}

function setup() {
  console.log("there are " + alicelines.length + " lines!"); // how many lines?

  var bigstring = ""; // the WHOLE BOOK in one HUGE STRING
  // concatenate whole book into one string:
  for (var i = 0; i<alicelines.length; i++)
  {
    bigstring+=alicelines[i]+" ";
  }
  
  // this is the whole original book:
  // console.log(bigstring);
  
  // this is how this works:
  // this is a regular expression that replaces
  // every instance of the word Rabbit with the word
  // Fox.  the / / are the boundaries of the search string.
  // the 'g' at the end means 'global', which will replace
  // *every* instance of 'Rabbit' with 'Fox'.
  //
  // there's a good regex cheat sheet here:
  // http://atarininja.org/~wxs/dump/ref/reference.html
  //
  // bigstring = bigstring.replace(/Rabbit/g, "Fox");
  
  // regular expressions can be ranges:
  //bigstring = bigstring.replace(/[A-G]/g, "#");
  //bigstring = bigstring.replace(/[H-K]/g, "!");
  //bigstring = bigstring.replace(/[L-Z]/g, "&");
  //bigstring = bigstring.replace(/[a-z]/g, "%");

  // strip all punctuation (regex):
  // the ^ character is a negation
  // the [] say we're talking regular expression-eese, not literal strings
  // you still start and end with / characters and slap a 'g' on the end.
  bigstring = bigstring.replace(/[^a-zA-Z0-9' ]/g, " ");

  // fix apostrophe catastrophe
  bigstring = bigstring.replace(/ '/g, " "); // apostrophe at beginning
  bigstring = bigstring.replace(/' /g, " "); // apostrophe at end
  
  // move to lowercase
  // bigstring = bigstring.toUpperCase();
  bigstring = bigstring.toLowerCase();

  // strip leading and extra whitespace (regex):
  // a + will take into account repeats
  bigstring = bigstring.replace(/ +/g, " ");
  bigstring = bigstring.trim();

  // view:
  console.log(bigstring);

  // the split will cut a string into an array of substrings
  // based on a matching pattern:
  var chapters = bigstring.split(/chapter [a-z]+/);
  // how many chapters?
  console.log("there are " + chapters.length + " chapters!");
  
  // one last strip of whitespace
  for(var i = 0;i<chapters.length;i++)
  {
    chapters[i] = chapters[i].trim();
  }

  // step 4: output a "cooked" text file
  // write line-by-line:
  saveStrings(chapters, 'alice_cooked.txt');

}

// this does nothing:
function draw() {
}
