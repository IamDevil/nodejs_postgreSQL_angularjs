const jwt = require('jsonwebtoken');
const io = require('socket.io');
//Token Encryption
const config = require('./config');

async function onConnect(socket) {
    try {

        if(socket.authed) {
            await socket.emit('ConnectStatus', {
                success: true,
                message: ''
            });
        }
        else {
            await socket.emit('ConnectStatus', {
                success: false,
                message: 'token valid error'
            });
        }

        socket.on("GetNearstDriverGPS", async function(data) {
            try {
                console.log("passengerLoaction=" + data.passengerLoaction);
                if ((data.passengerLoaction || data.passengerGPS) && data.callDriverType) {
                    await socket.emit('GetNearstDriverGPS', {
                        success: true,
                        exclusiveCarTeam: {
                            gps_lat: 21.74,
                            gps_lng:121.53,
                            distance: 10.5, //km
                            time_from_here_to_you: 17 //min
                        },
                        otherCarTeam: {
                            gps_lat: 21.74,
                            gps_lng:121.53,
                            distance: 10.5, //km
                            time_from_here_to_you: 17 //min
                        },
                        message: ''
                    });
                }
                else {
                    await socket.emit('GetNearstDriverGPS', {
                        success: false,
                        message: 'You Need passengerLoaction(ex "Dashe street.") OR data.passengerGPS(ex "21.74, 121.53"), and you need callDriverType(ex "1", "2",  or "3").'
                    });
                }
            }
            catch(err) {
                await socket.emit('GetNearstDriverGPS', {
                    success: false,
                    message: err.message
                });
            }
        });

        socket.on("disconnect", function(e) {
            console.log("Disconnected from global handler");
        });
    }
    catch(err) {
        console.log(err.message);
    }
}

module.exports = {
    onConnect: onConnect
};
