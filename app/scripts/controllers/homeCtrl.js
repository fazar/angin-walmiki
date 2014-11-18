angular.module('lookats.controllers')

.controller('homeCtrl', function($scope) {
	'use strict';
	$scope.posts = [
		{id:'1', title:'That Beauty', username: 'diansastro', photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg'},
		{id:'2', title:'That Beauty', username: 'diansastro', photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg'},
		{id:'3', title:'That Beauty', username: 'diansastro', photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg'},
		{id:'4', title:'That Beauty', username: 'diansastro', photoUrl : 'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg', avatarUrl : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg'}
	];

	/*$ionicModal.fromTemplateUrl('templates/post/create.html', function (modal) {
        $scope.newTemplate = modal;
    });

	$scope.new = function() {
	  $scope.newTemplate.show();
	}*/


});