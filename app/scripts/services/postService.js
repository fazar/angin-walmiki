angular.module('lookats.services')
	.factory('postService', function($http, $q, BaseService) {
		'use strict';
		return {
			getComments: function(postId) {				
				var deferrer = $q.defer();
				var comments = [];				
				
				$http.get(window.lookats.baseUrl + 'api/post/comments/' + postId)
				.success( function( data ) {

					data.forEach(function(item){
						var comment = {};
						comment.id = item._id;
						comment.text = item.text;
						comment.createdOn = BaseService.since(item.createdOn);
						comment.author = {
							username: item.author.username,
							fullname: item.author.fullname,
							avatar: window.lookats.baseUrl + 'api/image/' + item.author.avatar,
							id: item.author._id
						};
						comments.push(comment);
					});				
					
					deferrer.resolve(comments);
				})
				.error( function() {
					return {success: false, message: "error getting comments"};
				});

				return deferrer.promise;
			},
			addComment: function(comment) {
				var deferrer = $q.defer();
				var result = {};
				$http.post(window.lookats.baseUrl + 'api/post/comment/', comment)
				.success( function(data) {
					result.success = true;
					result.data = data.data;
					deferrer.resolve(result);
				})
				.error( function(){
					result.success = false;
					deferrer.resolve(result);
				});

				return deferrer.promise;
			}
		};
	});