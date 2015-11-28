angular.module('myApp.jokes', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('jokes', {
        url: '/jokes',
        views: {
            'jokesContent': {
                templateUrl: "view_jokes/jokes.html",
                controller: "JokesCtrl as jokes"
            }
        }
    })
}])

.controller('JokesCtrl', ['$rootScope', function($rootScope) {
    
}])