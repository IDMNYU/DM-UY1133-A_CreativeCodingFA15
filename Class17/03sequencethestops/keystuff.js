


function keyPressed()
{
  if(keyCode==187) drawscale*=1.25; // zoom in
  if(keyCode==189) drawscale*=0.8; // zoom out
  if(keyCode==39) drawtx -= 10;
  if(keyCode==37) drawtx += 10;
  if(keyCode==38) drawty += 10;
  if(keyCode==40) drawty -= 10;

}

function keyReleased()
{
  
}