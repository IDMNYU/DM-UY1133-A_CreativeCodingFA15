//
// serial stuff - read from arduino
//
var portname = '/dev/cu.usbmodem1411'; // luke's arduino

// npm install serialport
var com = require('serialport'); // this is the serial object

var serialPort = new com.SerialPort(portname, {
	baudrate: 9600,
	parser: com.parsers.readline('\r\n')
});

// start cookin'
serialPort.on('open', function() {
	console.log('SERIAL PORT OPENED!!!!!');
});

// data is coming in
serialPort.on('data', function(data) {
	console.log(data); // this our feel good move
});
