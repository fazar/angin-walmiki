'use strict';
angular.module('lookats.controllers')
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.controller('tabCtrl', function($scope,  Camera, $ionicModal, tagService, $state, $rootScope) {
  $scope.retake = function(){
//    e.preventDefault();
    $ionicModal.fromTemplateUrl('templates/home/pictureopt.html', {
        scope: $scope,
        state: $state
      }).then(function(modal) {
          $scope.pictOptions = modal;
          modal.show();
      });
      $scope.takePicture = function(type){
        $scope.pictOptions.hide();
        var sourceType = navigator.camera.PictureSourceType.CAMERA;
        if (type === 'library') {sourceType = navigator.camera.PictureSourceType.SAVEDPHOTOALBUM;}
              var options = {
                quality: 100,
                targetWidth: 1000,
                allowEdit : true,
                targetHeight: 1000,
                saveToPhotoAlbum: false,
                sourceType : sourceType,
                destinationType: navigator.camera.DestinationType.FILE_URI
              };
              // passing options in as a parameter
              Camera.getPicture(options).then(function(imageURI) {
                //$scope.lastPhoto = 'data:image/jpeg;base64,' + imageData;
                $rootScope.lastPhoto = imageURI;
                  $state.go('cropimage');

              },function(err) {
                alert('Failed because: ' + err);
              });
      };
  };
    $scope.goToLogin = function() {
		$state.go('auth.welcome');
	};
});



