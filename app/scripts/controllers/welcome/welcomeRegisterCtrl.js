angular.module('lookats.controllers')
.controller('WelcomeRegisterCtrl', function($scope, WelcomeService, $state, $ionicPopup, $timeout) {
	$scope.register = {};
	$scope.validation = {
		isFailed : false,
		message : ''
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

		WelcomeService.register($scope.register)
		.then(function (data) {
			if(data.success) {
				WelcomeService.login($scope.register.username, $scope.register.password)
				.then(function(dataLogin){
					if (dataLogin.success) {
						$state.go('welcome-interest');					
					} else {
						$ionicPopup.alert({
							title: 'Error',
							template: 'Invalid user or password'
						});					
					}
				});
			} else {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Register Error'
				});
			}
		});		
	};

	$scope.setFormScope= function(scope){
		this.formScope = scope;
	};

	var resetValidation = function() {
		$scope.validation.isFailed = false;
		$scope.validation.message = '';
	};

});