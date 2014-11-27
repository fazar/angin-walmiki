angular.module('lookats.controllers')
.config(function($compileProvider) {
	'use strict';
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
})
.controller('homeCtrl', function($scope, userService, $timeout) {
	'use strict';
	
	userService.getTimeline().then(function(data){
		//console.log(data);
		$timeout(function() {
			$scope.$apply(function(){
				$scope.posts = data;
				console.log($scope.posts);
			});
		});

	});

	$scope.doRefresh = function() {

		var post = {
			id:'1111',
			title:'That Beauty',
			image: {
				url:'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg'
			},
			author: {
				id: '54741227fb6a8b0420ac8e21',
				username: 'therealdisastr',
				fullname: 'Diandra Sastrowardoyo',
				avatar: 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg'
			},
			likedNumber: 200,
			commentNumber: 10,
			repostNumber: 50
		};
		setTimeout(function() {
			$scope.posts.unshift(post);
		}, 500);
		
		$scope.$broadcast('scroll.refreshComplete');
	};


});
