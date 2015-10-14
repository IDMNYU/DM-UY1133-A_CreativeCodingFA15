import processing.serial.*;

Serial myPort;      // The serial port
String inPut = "";    // Incoming serial data

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
  
}

void serialEvent(Serial myPort) {
  inPut = myPort.readStringUntil('\n'); // \n = carriage return
}

