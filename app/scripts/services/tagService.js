'use strict';
angular.module('lookats.services')
.factory('tagService', function($q, $timeout, $http){
  var searchTags = function(searchFilter) {
    var deferred = $q.defer();
    var matches = [];
    $http.get(window.lookats.baseUrl + 'api/tags/' + searchFilter)
        .success( function(data) {
            matches = data;
        })
        .error( function(err) {console.log(err);});
    $timeout( function(){
      deferred.resolve( matches );
    }, 100);
    return deferred.promise;
  };
  var searchUsers = function(searchFilter){
    var deferred = $q.defer();
    var matches = [];
    $http.get(window.lookats.baseUrl + 'api/users/' + searchFilter)
        .success( function(data) {
            matches = data;
        })
        .error( function(err) {console.log(err);});
    $timeout( function(){
      deferred.resolve( matches );
    }, 100);
    return deferred.promise;
  };
  return {
    searchTags : searchTags,
    searchUsers : searchUsers
  };
});
