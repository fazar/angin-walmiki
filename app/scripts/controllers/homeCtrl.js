angular.module('lookats.controllers')

.controller('homeCtrl', function($scope) {
	'use strict';
	$scope.posts = [
		{id:'1', title:'That Beauty', username: 'diansastro', viewed : '2104', time: '2 hours ago', 
			photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', 
			avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{id:'2', title:'That Beauty', username: 'diansastro', viewed : '2104', time: '2 hours ago', 
			photoUrl : 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10723966_363684577131445_1986852005_n.jpg', 
			avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{id:'3', title:'That Beauty', username: 'diansastro', viewed : '2104', time: '2 hours ago', 
			photoUrl : 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10748280_534094283392341_737416944_n.jpg', 
			avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
			relookNumber : '12',
			commentNumber : '20',
			likeNumber : '30'
		},

		{id:'4', title:'That Beauty', username: 'diansastro', viewed : '2104', time: '2 hours ago', 
			photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', 
			avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
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


});