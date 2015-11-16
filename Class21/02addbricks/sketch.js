
var ball; // THIS IS AN INDIVIDUAL SPRITE
var wallTop, wallBottom, wallLeft, wallRight; // SO ARE THESE
var bricks; // BUT THIS IS A GROUP

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
  
  
  // add some bricks:
  
  // SEE... TOLD YOU IT WAS A GROUP:
  bricks = new Group(); // group of bricks

  for(var i = 0;i<COLUMNS;i++)
  {
    for(var j = 0;j<ROWS;j++)
    {
      var xoffset = (width-COLUMNS*(BRICK_W+SPACEBETWEENBRICKS))/2;
      xoffset+=20; // WTF???
      yoffset = 50;
      var x = i*(BRICK_W+SPACEBETWEENBRICKS);
      var y = j*(BRICK_H+SPACEBETWEENBRICKS);
      
      // make a single sprite:
      var singlebrick = createSprite(xoffset+x, yoffset+y, BRICK_W, BRICK_H);
      singlebrick.immovable = true;
      
      // add it to the Group array:
      bricks.add(singlebrick);
    }
  }
  
}


function draw()
{
  background(0);
  
  // check for bounces:
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  ball.bounce(bricks, brickHit);
  
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

function brickHit(hitter, hitee)
{
  hitter.shapeColor =  hitee.shapeColor; // acquire color
  //hitter.shapeColor = color(random(128)+128, random(128)+128, random(128)+128);

  hitee.remove(); // kill the hitee
  
}