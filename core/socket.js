const io = require('socket.io');

async function onConnect(socket) {
    try {
        await socket.emit('ConnectStatus', {
            success: true,
            message: ''
        });

        socket.on("Login", async function(data) {
            try {
                if(data.token) {
                    console.log("Try Login " + data.token);
                    await socket.emit('LoginStatus', {
                        success: true,
                        message: ''
                    });
                }
                else {
                    console.log("Login Error ");
                    await socket.emit('LoginStatus', {
                        success: false,
                        message: 'must have token'
                    });
                }
            }
            catch(err) {
                console.log(err.message);
            }
        });

        socket.on("GetNearstDriverGPS", async function() {
            try {
                await socket.emit('GetNearstDriverGPS', {
                    success: true,
                    gps_lat: 21.74,
                    gps_lng:121.53,
                    distance: 10.5, //km
                    time_from_here_to_you: 17 //min
                });
            }
            catch(err) {
                console.log(err.message);
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
