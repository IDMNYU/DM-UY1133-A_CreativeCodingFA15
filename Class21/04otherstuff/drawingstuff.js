
function drawMainGame()
{
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
    paddlesynth.triggerAttackRelease("C4", 0.2);
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
  
  if(thescore==(ROWS*COLUMNS)) {
    whichscreen = 2;
    stahtOvah();
  }
}

function brickHit(hitter, hitee)
{
  hitter.shapeColor =  hitee.shapeColor; // acquire color
  //hitter.shapeColor = color(random(128)+128, random(128)+128, random(128)+128);

  var freq = map(hitee.position.x, 0, width, 100, 1000);
  bricksynth.triggerAttackRelease(freq, 1.);
  var freq = map(hitee.position.y, 0, height, 1000, 100);
  bricksynth.triggerAttackRelease(freq, 1.);

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
  
  // KILL EXISTING SPRITES:
  if(bricks!=undefined){
    for(var i = 0;i<ROWS*COLUMNS;i++)
    {
      bricks[0].remove(); // always remove the 0 element
    }
  bricks.clear();
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
