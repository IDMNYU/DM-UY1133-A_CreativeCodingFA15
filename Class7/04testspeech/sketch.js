var words = ["my", "dog", "has", "fleas"]; // some words
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
	myVoice.speak(words[iptr]);
	iptr = (iptr+1) % words.length; // increment
}