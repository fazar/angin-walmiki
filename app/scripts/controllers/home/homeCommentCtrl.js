angular.module('lookats.controllers')
.controller('HomeCommentCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state,
									postService, $ionicLoading, $rootScope, $ionicScrollDelegate) {
	'use strict';

	/*userService.getUserById($stateParams.postId).then(function(data) {
		$scope.user = data;
	});*/
	$rootScope.pageTitle = "COMMENTS";	
	$scope.comment = {};
	postService.getComments($stateParams.postId).then(function(data) {		
		console.log(data);
		$scope.comments = data;
	});

	$scope.addComment = function() {
		//alert($stateParams.postId);
		$ionicLoading.show();
		var comment = {
			postId: $stateParams.postId,
			text: $scope.comment.text
		};
		console.log(comment);
		postService.addComment(comment)
		.then(function(data) {
			$ionicLoading.hide();
			if (data.success) {				
				$scope.comments.push(data.data);
				$ionicScrollDelegate.scrollBottom();
				$scope.comment.text = '';
			} else {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Can not post comment'
				});					
			}
		});
	};
});
