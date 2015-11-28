angular.module('myApp.auth', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('auth', {
        url: "/auth",
        views: {
            "jokesContent": {
                templateUrl: "view_auth/auth.html",
                controller: 'AuthCtrl as auth'
            }
        }
    })
}])

.controller('AuthCtrl', ['$rootScope', function($rootScope){
 
}])
