
// arduino is C, not Java and *definitely* not Javascript
int i = 0; // whole number, set to 0

// this guy runs when the chip gets power:
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // this sets up a serial line back to the 'puter

}

// this guy runs every loop of the CPU:
void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(i);
  
  if(i%2==0) {
    // blink on evens
    digitalWrite(2, LOW);
  }
  else {
    digitalWrite(2, HIGH);
  }

  // i++; // impress your friends
  i = i + 1;
  delay(250);

}
