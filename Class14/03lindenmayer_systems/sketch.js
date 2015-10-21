
// generative grammars:
// lindenmayer system (L-system)
// axiom = A
// everytime i see an A, replace with BA
// everytime i see a B, replace with A
// rinse, repeat.
// we're gonna do this like um 10 times

var thestring = 'A';
var howmanytimes = 10;
var stringpos = 0;

var thenoise;

var theamp = 1;

function setup()
{
  frameRate(30);
  
  dotherulez();

  thenoise = new p5.Noise();
  thenoise.setType('white');
  thenoise.start();
}

function draw()
{
  if(thestring.charAt(stringpos)=='A') {
    thenoise.setType('white');
    thenoise.amp(1);
  }
  if(thestring.charAt(stringpos)=='B') thenoise.amp(0);
  if(thestring.charAt(stringpos)=='C') {
    thenoise.setType('pink');
    thenoise.amp(1);
  }

  stringpos = (stringpos+1) % thestring.length;
  
}

function dotherulez()
{
  console.log(thestring);
  for(var i =  0;i<howmanytimes;i++)
  {
    var outstring = '';
    for(var j = 0;j<thestring.length;j++)
    {
      if(thestring.charAt(j)=='A') outstring+='BA';
      if(thestring.charAt(j)=='B') outstring+='ABC';
      if(thestring.charAt(j)=='C') outstring+='CAB';
    }
    thestring = outstring;
    // uncomment this for fun:
    // and by fun, i mean it could crash:
    //console.log(thestring);
  }
  
}


