angular.module('myapp', ["ui.router", "ngAnimate", "ui.bootstrap"])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/home.html'
        })
        .state('result', {
            url: '/result',
            templateUrl: 'templates/result.html',
            controller: 'ResultCtrl'
        });
});