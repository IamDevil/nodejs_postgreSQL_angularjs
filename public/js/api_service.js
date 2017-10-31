(function() {
    'use strict';
    angular.module('taxiApp')
    .factory('apiUse', apiInit);

    function apiInit($http) {
        const URLBASE = '/api';
        let dataFactory = {};

        dataFactory.tryLogin = async function (user_account, user_password) {
            const DATA = {
    				user_account : user_account,
                    user_password: user_password
    		};

            try{
                const response = await  $http.post(URLBASE + '/Login', DATA);
                return response.data;
            }
            catch(err) {
                return err.data;
            }
        };

        return dataFactory;
    }
    apiInit.$inject = ["$http"];
})();
