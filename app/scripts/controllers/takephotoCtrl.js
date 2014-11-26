'use strict';
angular.module('lookats.controllers')
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.controller('takephotoCtrl', function($scope, Camera, $ionicModal, tagService, $http, $window, $state) {
  $ionicModal.fromTemplateUrl('templates/home/tags.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.tags = modal;
  });
  $scope.addTags = function(){
    $scope.tags.show();
  };
  $scope.data = { 'tags' : [], 'search' : '', 'users':[], 'searchUser' : '' };
  $scope.post = {
    'title' : '',
    'tags':[],
    'tagNames' : '',
    'tagNamesArr':[],
    'taggedUsers' : [],
    'taggedUserNames' : '',
    'taggedUserNamesArr' : []
  };
  $scope.search = function() {
    tagService.searchTags($scope.data.search).then(
      function(matches) {
        $scope.data.tags = matches;
      }
    );
  };
  $scope.addTag = function(tag){
    $scope.post.tags.push(tag._id);
    $scope.post.tagNamesArr.push(tag.name);
    $scope.post.tagNames = $scope.post.tagNamesArr.join();
    $scope.data.search = '';
    $scope.data.tags = [];
  };
  $scope.addTagsResult = function(){
    if($scope.data.search == ''){return;}
    $scope.post.tags.push($scope.data.search);
    $scope.post.tagNamesArr.push($scope.data.search);
    $scope.post.tagNames =   $scope.post.tagNamesArr.join();
     $scope.data.search = '';
  };
   $ionicModal.fromTemplateUrl('templates/home/taggedUsers.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.taggedUsers = modal;
  });
  $scope.addUsers = function(){
    $scope.taggedUsers.show();
  };
  $scope.searchUsers = function() {
    tagService.searchUsers($scope.data.searchUser).then(
      function(matches) {
        $scope.data.users = matches;
      }
    );
  };
  $scope.addUser = function(user){
    $scope.post.taggedUsers.push(user._id);
    $scope.post.taggedUserNamesArr.push(user.fullname);
    $scope.post.taggedUserNames = $scope.post.taggedUserNamesArr.join();
    $scope.data.searchUser = '';
    $scope.data.users = [];
  };
  $scope.send = function(){
    var myImg = $scope.lastPhoto;
    var options = new FileUploadOptions();
    var authorization = 'Bearer ' + $window.sessionStorage.token;
    options.fileKey="image";
    options.chunkedMode = false;
    options.headers = {'Authorization' : authorization};
    var ft = new FileTransfer();
    ft.upload(myImg, encodeURI(window.lookats.baseUrl + 'api/image/'),function(data){      
      var postData = {
        "title" : $scope.post.title,
        "image" : data.response.substring(1, data.response.length-1), 
        "tags" : $scope.post.tags,
        "taggedUsers" : $scope.post.taggedUsers
		}
     $http.post(window.lookats.baseUrl + 'api/post/',postData)
      .success(function(){
        $state.go('tab.home');
      });
    }, function(err){ console.log(err);}, options);
  }
});
