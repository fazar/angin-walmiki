'use strict';
angular.module('lookats.controllers')
.controller('cropimageCtrl', function($scope, $rootScope, $state) {
  $scope.tobeCropped = '';
  $scope.myCroppedImage='';
  $scope.tobeCropped = $rootScope.lastPhoto;
  $scope.test = function(ob){
    $rootScope.myCroppedImage = ob;
  }
  $scope.next = function(){
    $state.go('tab.camera');
  }
});



