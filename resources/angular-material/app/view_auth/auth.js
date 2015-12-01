"use strict"

angular.module('myApp.auth', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('auth', {
        url: "/auth",
        data: {
            permissions: {
                except: ['isloggedin'],
                redirectTo: 'jokes'
            }
        },
        views: {
            "jokesContent": {
                templateUrl: "view_auth/auth.html",
                controller: 'AuthCtrl as auth'
            }
        }
    })
}])

.controller('AuthCtrl', ['$auth', '$state', '$http', '$rootScope', function($auth, $state, $http, $rootScope) {
    let vm = this

    vm.loginError = false
    vm.loginErrorText

    vm.login = () => {
        let credentials = {
            email: vm.email,
            password: vm.password
        }

        $auth.login(credentials).then(() => {
            $http.get('http://localhost:8000/api/v1/authenticate/user').success((response) => {
                let user = JSON.stringify(response.user)
                localStorage.setItem('user', user)
                $rootScope.currentUser = response.user
                $state.go('jokes')
            })
            .error(() => {
                vm.loginError = true
                vm.loginErrorText = error.data.error
                console.log(vm.loginErrorText)
            })
        })
    }
}])
