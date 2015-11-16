
var ball, paddle; // THESE ARE INDIVIDUAL SPRITES
var wallTop, wallBottom, wallLeft, wallRight; // SO ARE THESE
var bricks; // BUT THIS IS A GROUP

var MAX_SPEED = 9;
var BRICK_W = 40;
var BRICK_H = 20;
var SPACEBETWEENBRICKS = 4;
var ROWS = 9;
var COLUMNS = 16;

var lives; // NUMBER OF LIVES

var whichscreen = 0;

// SOUND STUFF:
var paddlesynth;
var bricksynth;

function setup()
{
  createCanvas(800, 600);
  
  // make a paddle
  paddle = createSprite(width/2, height-50, 100, 10);
  paddle.immovable = true;
  
  // make some walls (immovable is important);
  wallTop = createSprite(width/2, 0, width, 15);
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height, width, 15);
  wallBottom.immovable = true;

  wallLeft = createSprite(0, height/2, 15, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width, height/2, 15, height);
  wallRight.immovable = true;

  // make a ball:
  ball = createSprite(width/2, height-200, 11, 11);
  ball.maxSpeed = MAX_SPEED;
  ball.shapeColor = 255;
  
  
  // add some bricks:
  stahtOvah();
  
  
  // SOUND STUFF:
  paddlesynth = new Tone.SimpleSynth().toMaster();
  bricksynth= new Tone.PolySynth(8, Tone.MonoSynth).toMaster();
  bricksynth.set("oscillator", {"type" : "sine"})
  bricksynth.set("volume", -12);
}


function draw()
{
  background(0);
  
  if(whichscreen==0)
  {
    fill(255 * ((millis()%500)>250));
    textSize(36);
    textAlign(CENTER);
    text("PRESS THE MOUSE TO BEGIN", width/2, height/2);
  }
  
  if(whichscreen==1)
  {
    drawMainGame();
  }
  
  if(whichscreen==2)
  {
    fill(255 * ((millis()%500)>250));
    textSize(36);
    textAlign(CENTER);
    text("YOU WON!!!!!", width/2, height/2);
  }


}

function mousePressed()
{
  if(whichscreen == 0 || whichscreen == 2)
  {
    whichscreen = 1;
  }
  if(whichscreen == 1)
  {
    if(ball.velocity.x==0 && ball.velocity.y==0)
      {
        ball.setSpeed(MAX_SPEED, random(70, 110));
      }
  }
}

