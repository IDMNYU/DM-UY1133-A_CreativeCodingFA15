
// these are libraries needed for the accelerometer:
#include <Wire.h>
#include <L3G.h>

L3G gyro; // this is an object that represents the chip

// arduino is C, not Java and *definitely* not Javascript
int light = 0; // this is the photocell amount
int sound = 0; // this is the potentiometer amount (aka the little blue knob)

// this guy runs when the chip gets power:
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // this sets up a serial line back to the 'puter
  Wire.begin(); // starts the SCL/SDA system

  if (!gyro.init())
  {
    Serial.println("Failed to autodetect gyro type!");
    while (1);
  }

  gyro.enableDefault(); // ???
}

// this guy runs every loop of the CPU:
void loop() {
  light = analogRead(A0); // read from analog pin 0
  sound = analogRead(A1); // read from analog pin 1
  gyro.read(); // read the accelerometer using I2C


  // put your main code here, to run repeatedly:
  Serial.print(light);
  Serial.print(" ");
  Serial.print(sound);
  Serial.print(" ");
  Serial.print((int)gyro.g.x);
  Serial.print(" ");
  Serial.print((int)gyro.g.y);
  Serial.print(" ");
  Serial.print((int)gyro.g.z);
  Serial.println();

  delay(10); // this is the speed
}
