var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

var socket = io.connect();

socket.on('ConnectStatus', function(data){
    if(data.success) {
        console.log("connected");
        socket.emit('Login', {token: 123});
    }
    else {
        console.log("connect fail");
    }
});

socket.on('LoginStatus', function(data){
    if(data.success) {
        console.log("Logined");
        socket.emit('GetNearstDriverGPS');
    }
    else {
        console.log("Login fail");
    }
});

socket.on('GetNearstDriverGPS', function(data){
    if(data.success) {
        console.log(data);
    }
    else {
        console.log("Get Data Fail");
    }
});
