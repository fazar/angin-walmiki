angular.module('lookats.controllers')
.controller('HomeProfileCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state,
									userService, $ionicLoading) {
	'use strict';

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
