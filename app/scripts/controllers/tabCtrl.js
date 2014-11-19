'use strict';
angular.module('lookats.controllers')
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
                destinationType: navigator.camera.DestinationType.DATA_URL
              };
              // passing options in as a parameter
              Camera.getPicture(options).then(function(imageData) {
                $scope.lastPhoto = 'data:image/jpeg;base64,' + imageData;
                $state.go('tab.camera');
                
              },function(err) {
                console.err(err);
              });
      };
  };
});
    
    
    
