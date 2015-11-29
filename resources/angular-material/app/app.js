angular.module('myApp', [
    // 'ngRoute',
    'ui.router',
    'myApp.jokes',
    //'myApp.view2',
    'myApp.auth',
    //'myApp.version'
    'ngMaterial',
    'satellizer'
])

.config(/*function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('lime')
    },*/
    ['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
        $authProvider.loginUrl = 'http://localhost:8000/api/v1/authenticate'
        $urlRouterProvider.otherwise('/auth')
    }]
)

.run(function($rootScope, $state, $auth) {
    $rootScope.logout = () => {
        $auth.logout().then(() => {
            localStorage.removeItem('user')
            $rootScope.currentUser = null
            $state.go('auth')
        })
    }
    $rootScope.currentUser = JSON.parse(localStorage.getItem('user'))
})