(function () {
    'use strict';
    angular
        .module('my-app')
        .factory('authenticationSvc', AuthenticationSvc);
        AuthenticationSvc.$inject = ['$http','$q','$state','$ionicPopup'];
        function AuthenticationSvc($http,$q,$state,$ionicPopup){
            var host = 'http://localhost:8100/api/';
            return{
                login: login
            };
            function login(LoginModel){
                var data = "grant_type=password&username=" + LoginModel.userName + "&password=" + LoginModel.password;
                var deferred = $q.defer();
                $http.post(host + 'authentication/login', data).success(function(response){
                    $state.go('tab.chats');
                }).error(function(response){
                    var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                })
            });
        }
    }
})();