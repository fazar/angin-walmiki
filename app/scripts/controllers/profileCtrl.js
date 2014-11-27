angular.module('lookats.controllers')
.controller('profileCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state,
									userService, $ionicLoading) {
	'use strict';
	var interests = ['beach', 'party', 'formal party', 'travel', 'carnaval', 'sports', 'football', 'library', 'music', 'jazz', 'movie', 'film', 'car', 'girlie','mainly'];
	var interestsChosen = [];

	$scope.interests = interests;
	$scope.customInterest = '';
	$scope.interestsChosen = interestsChosen;
	$scope.users = [
		{username : 'fazar', id:'1'},
		{username : 'candra', id:'2'},
		{username : 'dikdik', id:'3'},
		{username : 'putu', id:'4'}
	];

	userService.get($stateParams.id).then(function(data) {
		console.log(data);
		$scope.user = data;
	});

	$scope.selectedTab = 'posts';
	userService.posts($stateParams.id).then(function(data){

		$scope.posts = data;
	});

	//alert($stateParams.id);
	/*$scope.user = {
		username : 'therealdisastr',
		fullname : 'Dian Sastro',
		id : '1',
		avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
		about : 'Actress',
		location : 'Indonesia',
		interest : ['travel', 'philosophy']
	}*/

	$scope.addInterests = function(interest) {
		if (!$scope.isChosen(interest)) {
			interestsChosen.push(interest);
		} else {
			var idx = interestsChosen.indexOf(interest);
			interestsChosen.splice(idx, 1);
		}
	};

	$scope.isChosen = function(interest) {
		return interestsChosen.indexOf(interest) > -1;
	};

	$scope.nextToRecommendedUser = function() {
		$state.go('recommended-user');
	};

	$scope.follow = function(id) {
		alert('you follow user with id = ' + id);
	};

	$scope.nextToTimeline = function() {
		console.log(interestsChosen);
		$state.go('home.timeline');
	};

	$scope.follow = function(followingId) {
		userService.doFollow(followingId)
		.success( function( data ) {
			console.log(data);
		})
		.error( function( data ) {
			console.log(data);
		});
	};

	$scope.postView = 'thumbnail';
	$scope.showPostView = false;
	$scope.changePostView = function(view) {
		if($scope.postView !== view) {
			$ionicLoading.show();
			$scope.postView = view;
			setTimeout(function(){
				$ionicLoading.hide();
			}, 1000);
		}
	};
});
