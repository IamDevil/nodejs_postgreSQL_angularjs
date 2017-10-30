angular.module('taxiApp', []).factory('socketService', ['$q', '$rootScope', function($q, $rootScope) {
    // We return this object to anything injecting our service
    let Service = {};
    // Create our websocket object with the address to the websocket
    let ws = io.connect();

    ws.on('ConnectStatus', function(data){
        if(data.success) {
            console.log("connected");
            ws.emit('GetNearstDriverGPS', {
                passengerLoaction: '123',
                callDriverType: 1,
                token: 'abc'
            });
        }
        else {
            console.log("connect fail");
        }
    });

    ws.on('GetNearstDriverGPS', function(data){
        if(data.success) {
            console.log(data);
        }
        else {
            console.log(data.message);
        }
    });

    return Service;
}]);

angular.module('taxiApp')
  .controller('taxiController', ['socketService', function(socketService){
  }]);
