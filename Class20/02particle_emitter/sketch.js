//Sprite creation
//Click to create a new sprite with random speed

function setup() {
  createCanvas(800,400);
  background(0);
}

function draw() {
  background(0,10);  
  
  fill(0);
  
  var spritestomake = floor(random(-5, 10));

  for(var i =  0;i<spritestomake;i++)
  {
    // pass by reference:
    var s = createSprite(width/2, height, 5, 5);
    s.friction = 1.; // this is how much the velocity gets dampened every time
    s.velocity.x = random(-5, 5);
    s.velocity.y = random(-5, 5);
    s.shapeColor = [255, 255, 255, 20];
  }
  
  for(var i=0; i<allSprites.length; i++)
  {
    // pass by reference
    var temp = allSprites[i];
    temp.attractionPoint(1., mouseX, mouseY);
    temp.addSpeed(0.5, 90);
    
    if(temp.position.y > height + 100 || temp.position.y < -100 || temp.position.x > width + 100 || temp.position.x < -100)
    {
      temp.remove();
    }
  }

  
  
  //draw all the sprites added to the sketch so far
  //the positions will be updated automatically at every cycle
  drawSprites();
}

function keyPressed()
{
  background(0);
}
