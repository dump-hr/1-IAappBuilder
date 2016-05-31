#include "DHT.h"
#include "SoftwareSerial.h"

#define DHTPIN 10
#define MQ135PIN 0
#define MQ9PIN 1
#define COOffset 25

#define DHTTYPE DHT11

DHT TemperatureSensor(DHTPIN, DHTTYPE); 
SoftwareSerial BluetoothModule(3, 4); 

void setup() {
  BluetoothModule.begin(9600); 
  TemperatureSensor.begin(); 
}

void loop() {
  BluetoothModule.print(safeAnalogRead(MQ135PIN)); 
  BluetoothModule.print(",");
  
  float adjustedCOReading = safeAnalogRead(MQ9PIN) - COOffset;
  BluetoothModule.print(adjustedCOReading); 
  BluetoothModule.print(",");
  BluetoothModule.print(TemperatureSensor.readTemperature()); 
  BluetoothModule.print(",");
  BluetoothModule.print(TemperatureSensor.readHumidity()); 
  BluetoothModule.print("\n");

  delay(1000);
}

float safeAnalogRead(int pin) {
  analogRead(pin); 
  delay(10); 
  float measurement = (analogRead(pin) / 1024.0) * 100; 
  delay(10); 
  return measurement; 
}

