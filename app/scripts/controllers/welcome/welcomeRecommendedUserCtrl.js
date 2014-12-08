angular.module('lookats.controllers')
.controller('WelcomeRecommendedUserCtrl', function($scope, $state) {

	$scope.users = [
		{username : 'fazar', id:'1'},
		{username : 'candra', id:'2'},
		{username : 'dikdik', id:'3'},
		{username : 'putu', id:'4'}
	];

	$scope.follow = function(id) {
		alert('you follow user with id = ' + id);
	};

	$scope.nextToTimeline = function() {
		//console.log(interestsChosen);
		$state.go('dashboard.home');
	};

	/*$scope.follow = function(followingId) {
		userService.doFollow(followingId)
		.success( function( data ) {
			console.log(data);
		})
		.error( function( data ) {
			console.log(data);
		});
	};*/
});