'use strict';
angular.module('lookats.controllers')
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.controller('tabCtrl', function($scope,  Camera, $ionicModal, tagService, $state) {
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
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false,
                sourceType : sourceType,
                destinationType: navigator.camera.DestinationType.FILE_URI
              };
              // passing options in as a parameter
              Camera.getPicture(options).then(function(imageURI) {
                //$scope.lastPhoto = 'data:image/jpeg;base64,' + imageData;
                $scope.lastPhoto = imageURI;
                  $state.go('tab.camera');
                
              },function(err) {
                console.err(err);
              });
      };
  };

  $scope.goToLogin = function() {
		$state.go('auth.welcome');
	};

  $scope.goToHome = function () {
    $state.go('tab.home');
  };
  
});
    
