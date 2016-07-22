angular.module('myapp').factory('httpSrv', function($http) {
    return {
        get: function (url) {
            return $http.get(url)
                .then(function(res) {
                    return res.data;
            });
        }
    }
});