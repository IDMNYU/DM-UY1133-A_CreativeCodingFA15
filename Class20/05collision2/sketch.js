
var tednose; // image
var substance = new Array(20); // sound

var teds; // group (in p5.play terminology) of sprites

function preload()
{
  // load media:
  tednose = loadImage('./data/tednose.png');
  for(var i = 0 ;i<substance.length;i++) {
    substance[i] = loadSound('./data/substance.mp3');
  }
}

function setup() {
  createCanvas(800,400);
  background(0);
  
  teds = new Group(); // group of sprites
}

function draw() {
  background(0); // set background to 0

  // DOES THE COLLISION OF EXISTING TEDS:
  teds.bounce(teds); 
  
  // MAKES NEW TEDS:
  var tedstomake = floor(random(-10, 2));

  for(var i =  0;i<tedstomake;i++)
  {
    // pass by reference:
    var s = createSprite(width/2, height); // fountain
    s.friction = 1.; // this is how much the velocity gets dampened every time
    // initial velocity:
    s.velocity.x = random(-5, 5);
    s.velocity.y = random(-5, 5);
    s.scale = 0.4; // how big
    s.mass = s.scale; // mass based on scale
    // collider for physics:
    s.setCollider("rectangle", 0,0, tednose.width*s.scale, tednose.height*s.scale);
    s.life = 200; // after 200 frames the ted will die
    s.rotateToDirection = 1; // true/false to rotate or not
    s.addImage(tednose); // add ted's nose to image
    
    teds.add(s); // adds the sprite to the group of teds
  }
  
  // STEP 2 -> do some custom updating
  for(var i=0; i<allSprites.length; i++)
  {
    // pass by reference
    var temp = allSprites[i];
    temp.attractionPoint(1., mouseX, mouseY); // attract to mouse
    temp.addSpeed(0.5, 90); // add some gravity pointing south
    
    // check for collisions:
    temp.collide(teds, collision); // collision() plays the sound
    
    // remove sprites that fall offscreen
    if(temp.position.y > height + 20 || temp.position.y < -20 || temp.position.x > width + 20 || temp.position.x < -20)
    {
      teds.remove(temp);
      temp.remove(); // remove from sprites
    }
  }

  
  // the real work:
  // DRAW EVERYTHING:
  drawSprites();
}


// this is a custom function that runs when there is a collision:
function collision(a, b)
{
  // console.log("collision!");
  for(var i =  0;i<substance.length;i++)
  {
    if(!substance[i].isPlaying()) {
      substance[i].rate(random(0.9, 1.1));
      substance[i].play();
      break;
    }
  }
}

