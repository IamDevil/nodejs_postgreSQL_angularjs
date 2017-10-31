angular.module('taxiApp', [])
.controller('taxiController', taxiInit);

function taxiInit($scope, socketService, apiUse) {
    $scope.account = "test_driver";
    $scope.password = "test";

    $scope.getUserToken = getUserToken;
    async function  getUserToken() {
        try{
            const responseData = await apiUse.tryLogin($scope.account , $scope.password );
            if(responseData.success) {
                $scope.$apply(function () {
                    $scope.comment = JSON.stringify(responseData);
                });
                $scope.$apply(function () {
                    $scope.token = responseData.token;
                });
            }
            else {
                $scope.comment = responseData.message;
            }
        }
        catch(err){
            console.log(err);
        }
    }

    $scope.tryConnect = tryConnect;
    function tryConnect() {
        socketService.tryConnectWeb($scope.token, function (data) {
            $scope.$apply(function () {
                $scope.comment = data;
            });
        });
    }

    $scope.getNearstDriver = socketService.tryGetNearstDriverGPS;
}
taxiInit.$inject = ['$scope', 'socketService', 'apiUse'];
