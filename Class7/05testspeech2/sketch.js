var words = ["now is the winter of our discontent", 
"made glorious summer by this son of york", 
"and all the clouds that lowered upon our house", 
"in the deep bosom of the ocean buried."]; // some words
var iptr = 0; // a counter for the words

var myVoice = new p5.Speech(); // new P5.Speech object

function setup()
{
	// graphics stuff:
	createCanvas(400, 400);
	background(255, 0, 0);
	fill(255, 255, 255, 100);
	// instructions:
	textSize(72);
	textAlign(CENTER);
	text("click me", width/2, height/2);
	// say hello:
	myVoice.speak('shit!!!');
}

function draw()
{
	// why draw when you can click?
}

function keyPressed()
{
	background(255, 0, 0); // clear screen
	myVoice.listVoices(); // debug printer for voice options
}

function mousePressed()
{
	// if in bounds:
	ellipse(mouseX, mouseY, 50, 50); // circle
	// randomize voice and speak word:
	//myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
	myVoice.setVoice("Google UK English Male");
	myVoice.interrupt = 1; // now it's more interactive
	myVoice.setPitch(map(mouseY, 0, height-1, 2.0, 0.001));
	myVoice.setRate(map(mouseX, 0, width-1, 0.001, 2.0));
	myVoice.speak(words[iptr]);
	iptr = (iptr+1) % words.length; // increment
}