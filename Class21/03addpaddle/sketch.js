
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
  
}


function draw()
{
  background(0);
  
  // move the paddle
  paddle.position.x = mouseX;
  
  // check for bounces:
  
  // BOUNCE WITH NO CALLBACK:
  ball.bounce(wallTop);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  // BOUNCE WITH A CALLBACK FUNCTION:
  ball.bounce(wallBottom, isDead);

  // BOUNCE WITHOUT A CALLBACK BUT WITH CUSTOM STUFF ANYWAY:
  if(ball.bounce(paddle)) {
    var swing = (ball.position.x-paddle.position.x);
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing)/3.;
  }
  
  // BOUNCE WITH A CALLBACK FUNCTION:
  ball.bounce(bricks, brickHit);
  
  

  // this draws everybody:
  drawSprites();

  fill(255);
  noStroke();
  textSize(36);
  var thescore = (ROWS*COLUMNS)-bricks.length;
  text(thescore, 20, height-15);
  
  text(lives, width-40, height-15);


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

function isDead(hitter, hitee)
{
  hitter.position.x = width/2;
  hitter.position.y = height-200;
  hitter.setSpeed(0, 90);
  lives--;
  if(lives<1) // you really screwed up
  {
    stahtOvah();
  }
}

function stahtOvah()
{
  lives = 5; // start off with 5 lives
  
  // add some bricks:
  
  // SEE... TOLD YOU IT WAS A GROUP:
  
  // KILL EXISTING BRICKS:
  if(bricks!=undefined){
    for(var i = 0;i<bricks.length;i++)
    {
      bricks[i].remove();
    }
  }


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
