angular.module('lookats.controllers')
.controller('authCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $location, $http, $window, $rootScope, $ionicPopup) {
	'use strict';
	$scope.register = {};
	$scope.login = {};

	$scope.doRegister = function() {
		$http.post(window.lookats.baseUrl + 'api/register', $scope.register)
			.success( function() {
				login($scope.register.username, $scope.register.password, true);
			})
			.error( function() {
				alert('register gagal');
				delete $window.sessionStorage.token;
				//$scope.loginMessage = 'Error: Invalid user or password';
			});
	};

	$scope.doLogin = function(){
		login($scope.login.username, $scope.login.password, false);
	};

	$scope.registerBack = function(){
		$ionicNavBarDelegate.back();
	};

	var login = function(username, password, isFromRegister) {
		var userData = {username : username, password : password};
		$http.post(window.lookats.baseUrl + 'api/authenticate', userData)
			.success( function( data ) {
				$window.sessionStorage.token = data.token;
				if (isFromRegister) {
					$state.go('interest');
				} else {
					$state.go('tab.home');
				}
				alert('sukses login ' + data.token);
				console.log(data.token);
			})
			.error( function() {
				delete $window.sessionStorage.token;
				$ionicPopup.alert({
					title: 'Error',
					template: 'Invalid user or password'
				});
				
				//$scope.loginMessage = 'Error: Invalid user or password';
			});
	};
});