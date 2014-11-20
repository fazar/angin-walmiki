angular.module('lookats.controllers')

.controller('homeCtrl', function($scope) {
	'use strict';
	$scope.posts = [
		{
			id:'1',
			title:'That Beauty',
			username: 'diansastro',
			viewed : '2104',
			time: '2 hours ago',
			photo : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg',
			avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{
			id:'1',
			title:'That Beauty',
			username: 'diansastro',
			viewed : '2104',
			time: '2 hours ago',
			photo : 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10723966_363684577131445_1986852005_n.jpg',
			avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{
			id:'1',
			title:'That Beauty',
			username: 'diansastro',
			viewed : '2104',
			time: '2 hours ago',
			photo : 'http://photos-e.ak.instagram.com/hphotos-ak-xaf1/10802508_1536357399940740_754952390_n.jpg',
			avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{
			id:'1',
			title:'That Beauty',
			username: 'diansastro',
			viewed : '2104',
			time: '2 hours ago',
			photo : 'http://photos-a.ak.instagram.com/hphotos-ak-xpf1/10802669_366121943565696_696997595_n.jpg',
			avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},
	];

	/*$ionicModal.fromTemplateUrl('templates/post/create.html', function (modal) {
        $scope.newTemplate = modal;
    });

	$scope.new = function() {
	  $scope.newTemplate.show();
	}*/

	$scope.doRefresh = function() {
		var post = {
			id:'1',
			title:'That Beauty',
			username: 'diansastro',
			viewed : '2104',
			time: '2 hours ago',
			photo : 'http://photos-c.ak.instagram.com/hphotos-ak-xpa1/10808726_512686255501682_1231385606_n.jpg',
			avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		};
		setTimeout(function() {
			$scope.posts.unshift(post);
		}, 500);
		
		$scope.$broadcast('scroll.refreshComplete');
	};


});