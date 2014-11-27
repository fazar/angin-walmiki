'use strict';
angular.module('lookats.controllers')
.controller('takephotoCtrl', function($scope, Camera, $ionicModal, tagService, $http, $window, $state, $rootScope) {
  $scope.myCroppedImage = $rootScope.myCroppedImage;
  console.log($scope.myCroppedImage);
  $ionicModal.fromTemplateUrl('templates/home/tags.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.tags = modal;
  });
  $scope.addTags = function(){
    $scope.tags.show();
  };
  $scope.data = { 'tags' : [], 'search' : '', 'users':[], 'searchUser' : '', brands:[] };
  $scope.post = {
    'title' : '',
    'tags':[],
    'tagNames' : '',
    'tagNamesArr':[],
    'taggedUsers' : [],
    'taggedUserNames' : '',
    'taggedUserNamesArr' : [],
    'brands' : []
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
    if($scope.data.search === ''){return;}
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
    var authorization = 'Bearer ' + $window.localStorage.token;
    options.fileKey = 'image';
    options.chunkedMode = false;
    options.headers = {'Authorization' : authorization};
    var ft = new FileTransfer();
    ft.upload(myImg, encodeURI(window.lookats.baseUrl + 'api/image/'),function(data){
      var postData = {
        'title' : $scope.post.title,
        'image' : data.response.substring(1, data.response.length-1),
        'tags' : $scope.post.tags,
        'taggedUsers' : $scope.post.taggedUsers
		};
    $http.post(window.lookats.baseUrl + 'api/post/',postData)
      .success(function(){
        $state.go('tab.home');
      });
    }, function(err){ console.log(err);}, options);
  }
  $scope.imageTap = function(e){
    console.log(e);
    $scope.currentBrandId = $scope.post.brands.length;
    //coordinate calibration;
    var displayWidth = e.srcElement.clientWidth;
    var brand = {
      coordinate : [e.offsetX, e.offsetY],
      name : 'local brand',
      brand : 'default',
      posId : $scope.currentBrandId,
      show : false
    }
    $scope.post.brands.push(brand);
    $scope.post.brands[brand.posId].show = true;
    $scope.brand.show();
  };
   $ionicModal.fromTemplateUrl('templates/home/brand.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.brand = modal;
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function(modal) {
    if($scope.post.brands[$scope.currentBrandId].brand == 'default'){
      $scope.post.brands.pop();
    }
  });
  $scope.searchBrands = function() {
    tagService.searchBrands($scope.data.searchBrand).then(
      function(matches) {
        $scope.data.brands = matches;
      }
    );
  };
  $scope.addBrand = function(brand){
    var brand = {
      coordinate : $scope.post.brands[$scope.currentBrandId].coordinate,
      name : brand.name,
      brand : brand._id,
      posId : $scope.currentBrandId,
      show : false
    }
    $scope.post.brands.pop();
    $scope.post.brands.push(brand);
    $scope.post.brands[$scope.currentBrandId].show = true;
    $scope.brand.hide();
    $scope.data.searchBrand = '';
  }
  $scope.resolveBrand = function(){
     var brand = {
      coordinate : $scope.post.brands[$scope.currentBrandId].coordinate,
      name : $scope.data.searchBrand,
      brand : $scope.data.searchBrand,
      posId : $scope.currentBrandId,
      editClass : 'idle',
      show : false
    }
    $scope.post.brands.pop();
    $scope.post.brands.push(brand);
    $scope.post.brands[$scope.currentBrandId].show = true;
    $scope.brand.hide();
    $scope.data.searchBrand = '';
  }
  $scope.currentEdit = -1;
  $scope.editBrand = function(id){
    console.log('masuk gak ya');
    $scope.currentEdit = id;
    if($scope.post.brands[id].editClass == 'idle'){
      $scope.post.brands[id].editClass = 'edit';
    }else{
       $scope.post.brands.splice(id, 1);
        for(var i in $scope.post.brands){
          $scope.post.brands[i].posId = i;
        }
      $scope.currentBrandId = $scope.post.brands.length;
    }
  }
})
.animation('.tag-brand', function() {
  return {
    enter : function(element, parentElement, afterElement){
      element.css('margin-left', -element[0].clientWidth/2 + 'px');
    }
  };
});
