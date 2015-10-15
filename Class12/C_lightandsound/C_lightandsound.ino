
// arduino is C, not Java and *definitely* not Javascript
int light = 0; // this is the photocell amount
int sound = 0; // this is the potentiometer amount (aka the little blue knob)

// this guy runs when the chip gets power:
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // this sets up a serial line back to the 'puter
}

// this guy runs every loop of the CPU:
void loop() {
  light = analogRead(A0); // read from analog pin 0
  sound = analogRead(A1); // read from analog pin 1
  // put your main code here, to run repeatedly:
  Serial.print(light);
  Serial.print(" ");
  Serial.print(sound);
  Serial.println();

  delay(10);
}
