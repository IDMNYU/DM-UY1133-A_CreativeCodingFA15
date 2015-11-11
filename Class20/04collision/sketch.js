//Sprite creation
//Click to create a new sprite with random speed
var tednose; // image
var teds; // group of teds


function preload()
{
  tednose = loadImage('./data/tednose.png');
}

function setup() {
  createCanvas(800,400);
  background(0);
  
  teds = new Group(); // group of sprites
}

function draw() {
  background(0);  
  
  fill(0);
  
  teds.bounce(teds);
  
  var spritestomake = floor(random(-5, 2));

  for(var i =  0;i<spritestomake;i++)
  {
    // pass by reference:
    var s = createSprite(width/2, height, 5, 5);
    s.friction = 1.; // this is how much the velocity gets dampened every time
    s.velocity.x = random(-5, 5);
    s.velocity.y = random(-5, 5);
    s.scale = 0.5;
    s.mass = s.scale;
    s.setCollider("rectangle", 0,0, tednose.width*s.scale, tednose.height*s.scale);
    s.life = 200;
    s.rotateToDirection = 1;
    s.addImage(tednose);
    
    teds.add(s);
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
