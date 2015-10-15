
var foo = require('./lukeserver.js');

foo.startServer(8080);
foo.startSerial('/dev/cu.usbmodem1411');
foo.debugServer(true);
foo.debugSerial(true);

