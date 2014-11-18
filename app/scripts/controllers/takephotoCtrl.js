'use strict';
angular.module('lookats.controllers')
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.controller('takephotoCtrl', function($scope, Camera) {
	var options = {
		quality: 75,
		targetWidth: 320,
		targetHeight: 320,
		saveToPhotoAlbum: false
    //sourceType : Camera.PictureSourceType.PHOTOLIBRARY
	};
    // passing options in as a parameter
	Camera.getPicture(options).then(function(imageURI) {
		console.log(imageURI);
		$scope.lastPhoto = imageURI;
	}, function(err) {
		console.err(err);
	});
});
