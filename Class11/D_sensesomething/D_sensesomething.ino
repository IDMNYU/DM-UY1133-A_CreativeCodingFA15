
// arduino is C, not Java and *definitely* not Javascript
int pcell = 0; // this is the photocell amount

// this guy runs when the chip gets power:
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // this sets up a serial line back to the 'puter

}

// this guy runs every loop of the CPU:
void loop() {
  pcell = analogRead(A0); // read from analog pin 0
  // put your main code here, to run repeatedly:
  Serial.println(pcell);

  delay(10);

}
