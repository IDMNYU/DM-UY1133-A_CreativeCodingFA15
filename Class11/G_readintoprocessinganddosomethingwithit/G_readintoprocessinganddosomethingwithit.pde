import processing.serial.*;

Serial myPort;      // The serial port
String inPut = "";    // Incoming serial data

int pcell = 0;
int pot = 0;

void setup()
{
  size(400, 300); // this is CreateCanvas

  // List all the available serial ports:
  println(Serial.list()); // println = console.log

  // I know that the first port in the serial list on my mac
  // is always my  FTDI adaptor, so I open Serial.list()[0].
  // In Windows, this usually opens COM1.
  // Open whatever port is the one you're using.
  String portName = Serial.list()[5]; // first serial port
  myPort = new Serial(this, portName, 9600);
  myPort.bufferUntil('\n'); // get rid of all the crap until there's a newline
  
}

void draw()
{
  background(0);
  text("Last Received: " + inPut, 10, 130);
  fill(float(pot)/4.0);
  ellipse(width/2, height/2, pcell/4, pcell/4);
}

void serialEvent(Serial myPort) {
  inPut = myPort.readStringUntil('\n'); // \n = carriage return
  inPut = trim(inPut); // get rid of extra space

  String[] stuff = split(inPut, ' '); // split into individual values based on space
  pcell = parseInt(stuff[0]); // first number
  pot = parseInt(stuff[1]); // second number
}

