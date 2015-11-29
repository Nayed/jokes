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

 /*.config(function($mdThemingProvider) {
   $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
 });
*/

.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
    $authProvider.loginUrl = 'http://localhost:8000/api/v1/authenticate'
    $urlRouterProvider.otherwise('/auth')
}])