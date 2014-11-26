angular.module('lookats.controllers')
.controller('authCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $location, $http, $window, $rootScope, $ionicPopup, $timeout) {
	'use strict';
	$scope.register = {};
	$scope.login = {};
	$scope.validation = {
		isFailed : false,
		message : ''
	};

	/*$scope.$watch('registerForm', function(registerForm){		
		console.log(registerForm);
	});*/

	$scope.setFormScope= function(scope){
		this.formScope = scope;
	};

	$scope.doRegister = function() {
		if(this.formScope.registerForm.$invalid) {
			$scope.validation.isFailed = true;
			if(this.formScope.registerForm.email.$error.required) {
				$scope.validation.message = 'Please enter your email address';
			}
			else if(this.formScope.registerForm.email.$error.email) {
				$scope.validation.message = 'Format your email';
			}
			else if(this.formScope.registerForm.username.$error.required) {
				$scope.validation.message = 'Please enter your username';
			}
			else if(this.formScope.registerForm.password.$error.required) {
				$scope.validation.message = 'Please enter your password';
			}
			else if(this.formScope.registerForm.fullname.$error.required) {
				$scope.validation.message = 'Please enter your full name';
			}

			$timeout(resetValidation, 1000);
			return;
		}

		$http.post(window.lookats.baseUrl + 'api/register', $scope.register)
			.success( function() {
				login($scope.register.username, $scope.register.password, true);
			})
			.error( function() {
				alert('register gagal');
				delete $window.localStorage.token;
				//$scope.loginMessage = 'Error: Invalid user or password';
			});
	};

	$scope.doLogin = function(){
		login($scope.login.username, $scope.login.password, false);
	};

	$scope.registerBack = function(){
		$ionicNavBarDelegate.back();
	};

	$scope.goToLogin = function() {
		$state.go('auth.login');
	};

	var login = function(username, password, isFromRegister) {
		var userData = {username : username, password : password};
		$http.post(window.lookats.baseUrl + 'api/authenticate', userData)
			.success( function( data ) {
				$window.localStorage.token = data.token;
				if (isFromRegister) {
					$state.go('interest');
				} else {
					$state.go('tab.home');
				}
				alert('sukses login ' + data.token);
				console.log(data.token);
			})
			.error( function() {
				delete $window.localStorage.token;
				$ionicPopup.alert({
					title: 'Error',
					template: 'Invalid user or password'
				});
				
				//$scope.loginMessage = 'Error: Invalid user or password';
			});
	};

	var resetValidation = function() {
		$scope.validation.isFailed = false;
		$scope.validation.message = '';
	};
});