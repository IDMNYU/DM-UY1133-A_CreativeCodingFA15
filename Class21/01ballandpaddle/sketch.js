
var ball;
var wallTop, wallBottom, wallLeft, wallRight;
var bricks;

var MAX_SPEED = 9;
var BRICK_W = 40;
var BRICK_H = 20;
var SPACEBETWEENBRICKS = 4;
var ROWS = 9;
var COLUMNS = 16;


function setup()
{
  createCanvas(800, 600);
  
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
}


function draw()
{
  background(0);
  
  // check for bounces:
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  
  // this draws everybody:
  drawSprites();
}

function mousePressed()
{
  if(ball.velocity.x==0 && ball.velocity.y==0)
    {
      ball.setSpeed(MAX_SPEED, random(70, 110));
    }
}