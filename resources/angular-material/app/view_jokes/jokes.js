"use strict"

angular.module('myApp.jokes', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('jokes', {
        url: '/jokes',
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'auth'
            }
        },
        views: {
            'jokesContent': {
                templateUrl: "view_jokes/jokes.html",
                controller: "JokesCtrl as jokes"
            }
        }
    })
}])

.controller('JokesCtrl', ['$http', '$auth', '$rootScope', '$state', '$q', function($http, $auth, $rootScope, $state, $q) {
    let vm = this

    vm.jokes = []
    vm.error
    vm.joke

    $http.get('http://localhost:8000/api/v1/jokes').success((jokes) => {
        console.log(jokes)
        vm.jokes = jokes.data
    }).error((error) => {
        vm.error = error
    })

    vm.addJoke = () => {
        $http.post('http://localhost:8000/api/v1/jokes', {
            body: vm.joke,
            user_id: $rootScope.currentUser.id
        }).success(function(response) {
            /*console.log(vm.jokes)
            vm.jokes.push(response.data)*/
            vm.jokes.unshift(response.data)
            console.log(vm.jokes)
            vm.joke = ''
            /*alert(data.message)
            alert("Joke Created Successfully")*/
        }).error(() => {
            console.log("error")
        })
    }
}])
