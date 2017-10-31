(function() {
    'use strict';
    angular.module('taxiApp')
    .factory('socketService', connectService);

    function connectService($q, $rootScope) {
        // We return this object to anything injecting our service
        let Service = {};
        // Create our websocket object with the address to the websocket
        Service.ws;

        Service.tryConnectWeb = function(token, callback) {
            Service.ws = io.connect({
                query: {token: token}
            });

            Service.ws.on('ConnectStatus', function(data){
                if(data.success) {
                    callback("connect=> ConnectStatus:" + JSON.stringify(data));
                }
                else {
                    callback("connect error => ConnectStatus:" + JSON.stringify(data));
                }
            });

            Service.ws.on('GetNearstDriverGPS', function(data){
                if(data.success) {
                    callback("success => GetNearstDriverGPS:"+ JSON.stringify(data));
                }
                else {
                    callback("error => GetNearstDriverGPS:"+ JSON.stringify(data));
                }
            });
        }

        Service.tryGetNearstDriverGPS = function() {
            if(Service.ws) {
                Service.ws.emit('GetNearstDriverGPS', {
                    passengerLoaction: '123',
                    callDriverType: 1,
                    token: 'abc'
                });
            }
        }
        return Service;
    }
    connectService.$inject = ['$q', '$rootScope'];
})();
