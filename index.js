var http = require('http'),
    raspi = require('raspi-io'),
    five = require('johnny-five'),
    board = five.Board({
        io: new raspi()
    });

var port = 3000;
var led;

board.on('ready', function() {
    console.log('board is ready!');
    
    http.createServer(function(req, res) {
        req.on('data', function(chunk) {
            var data = JSON.parse(chunk.toString());

            if (!led) { 
                console.log('pin initiated with ' + data.pin);
                led = new five.Led(data.pin);
            }

            console.log('executing command: "%s"', data.command);

            switch (data.command) {
                case 'on':
                    led.on();
                    break;

                case 'off':
                    led.off();
                    break;

                case 'strobe':
                    led.strobe();
                    break;

                case 'stop':
                    led.stop();
                    break;

                case 'fadeIn': {
                    if (command.ms) {
                        led.fadeIn(command.ms); 
                    }else{
                        return res.status(400).json({ message: 'Bad Request' });
                    }
                }
                    break;

                case 'fadeOut': {
                    if (command.ms) {
                        led.fadeOut(command.ms); 
                    }else{
                        return res.status(400).json({ message: 'Bad Request' });
                    }
                }
                    break; 
                default:
                    console.log('Invalid command. Available commands: "on", "off", "strobe", "stop"');
                    break;
            }

            res.end();
        });
    }).listen(port);
    console.log('listening on port ' + port);
});

console.log('preparing board...');
