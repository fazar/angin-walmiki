'use strict';
angular.module('lookats.controllers')
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.controller('takephotoCtrl', function($scope, Camera, $ionicModal, tagService) {
  $ionicModal.fromTemplateUrl('templates/home/tags.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.tags = modal;
  });
  $scope.addTags = function(){
    $scope.tags.show();
  };
  $scope.data = { 'tags' : [], 'search' : '' };
  $scope.search = function() {
    tagService.searchTags($scope.data.search).then(
      function(matches) {
        $scope.data.tags = matches;
      }
    );
  };
});
