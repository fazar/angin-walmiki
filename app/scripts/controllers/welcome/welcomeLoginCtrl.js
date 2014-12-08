angular.module('lookats.controllers')
.controller('WelcomeLoginCtrl', function($scope, WelcomeService, $state, $ionicPopup) {
	$scope.login = {};
	$scope.doLogin = function() {
		WelcomeService.login($scope.login.username, $scope.login.password)
		.then(function(data){
			if (data.success) {
					$state.go('dashboard.home');					
				} else {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Invalid user or password'
					});					
				}
		});
	};


});