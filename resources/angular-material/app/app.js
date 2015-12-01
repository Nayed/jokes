angular.module('myApp', [
    // 'ngRoute',
    'ui.router',
    'myApp.jokes',
    //'myApp.view2',
    'myApp.auth',
    //'myApp.version'
    'ngMaterial',
    'satellizer',
    'permission'
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

.run(function($rootScope, $state, $auth, Permission) {
    $rootScope.logout = () => {
        $auth.logout().then(() => {
            localStorage.removeItem('user')
            $rootScope.currentUser = null
            $state.go('auth')
        })
    }
    $rootScope.currentUser = JSON.parse(localStorage.getItem('user'))


    Permission
        .defineRole('anonymous', function(stateParams) {
            /*  if the returned value is *truthy* then the user has the role, otherwise they don't
                let User = JSON.parse(localStorage.getItem('user'))
                console.log("anonymous", $auth.isAuthenticated())*/
            if (!$auth.isAuthenticated()) {
                return true // is anonymous
            }
            return false
        })
        .defineRole('isloggedin', function(stateParams) {
            /*  if the returned value is *truthy* then the user has the role, otherwise they don't
                console.log("isloggedin", $auth.isAuthenticated())*/
            if ($auth.isAuthenticated()) {
                return true // is loggedin
            }
            return false
        })
})

