angular.module('lookats.services')
	.factory('userService', function($rootScope, $state, $window, $http, $q) {
		'use strict';
		return {
			get: function(id) {
				var deferrer = $q.defer();

				var user = {};				
				$http.get(window.lookats.baseUrl + 'api/profile/' + id)
				.success( function( data ) {					
					user.id = data.id;
					user.username = data.username;
					user.fullname = data.fullname;
					user.followers = data.followers;
					user.following = data.following;					
					user.cover = 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10723966_363684577131445_1986852005_n.jpg';					
					user.avatar = window.lookats.baseUrl + 'api/image/' + data.avatar._id;
					user.isSelf = data.isSelf;
					user.areYouFollowHim = data.areYouFollowHim;
					user.isYourFollower = data.isYourFollower;
					deferrer.resolve(user);
				})
				.error( function() {
					
				});

				return deferrer.promise;
			},
			getTimeline: function () {
				var deferrer = $q.defer();
				
				$http.get(window.lookats.baseUrl + 'api/user/timeline')
				.success( function( data ) {
					var posts = [];
					var post = {};
					//posts = data;
					//we are using foreach manually instead of assign it automatically.
					data.forEach(function(item){
						post.id = item._id;
						post.title = item.title;
						post.image = {
							id : item.image,
							url: window.lookats.baseUrl + 'api/image/' + item.image
						};
						post.author = {
							id: item.author._id,
							username: item.author.username,
							fullname: item.author.fullname,
							avatar: item.author.avatar
						};
						post.commentNumber = item.commentNumber;
						post.likedNumber = item.likedNumber;
						post.repostedNumber = item.repostedNumber;
						posts.push(post);
					});

					deferrer.resolve(posts);
				}).error( function() {
					return 'error on get timeline';
				});

				return deferrer.promise;
			},
			doFollow: function(userId) {				
				return $http.put(window.lookats.baseUrl + 'api/user/follow', {userId: userId});					
			},
			posts: function(id){
				var deferrer = $q.defer();
				$http.get(window.lookats.baseUrl + 'api/posts/' + id)
				.success( function( data ) {
					var posts = [];
					var post = {};
					//posts = data;
					//we are using foreach manually instead of assign it automatically.
					data.forEach(function(item){
						post.id = item._id;
						post.title = item.title;
						post.image = {
							id : item.image,
							url: window.lookats.baseUrl + 'api/image/' + item.image
						};
						post.author = {
							id: item.author._id,
							username: item.author.username,
							fullname: item.author.fullname,
							avatar: item.author.avatar
						};
						post.commentNumber = item.commentNumber;
						post.likedNumber = item.likedNumber;
						post.repostedNumber = item.repostedNumber;
						posts.push(post);
					});					
					deferrer.resolve(posts);	
				})
				.error( function() {
					return 'error on get timeline';
				});
				

				return deferrer.promise;
			},
			test: function() {
				return {
					username : 'therealdisastr',
					fullname : 'Diandra Sastrowardoyo',
					id : '1',
					avatar : 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
					about : 'Actress',
					location : 'Indonesia',
					interest : ['travel', 'philosophy']
				};
			},
			fakePosts: function(id) {
				var deferrer = $q.defer();
				var post = [
					{
						image: {
							url:'http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10706903_707508032676801_696532404_n.jpg'
						},
						avatar: 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
						username: 'diansastro',
						likedNumber: 200,
						commentNumber: 10,
						repostNumber: 50
					},
					{
						image: {
							url: 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10723966_363684577131445_1986852005_n.jpg'
						},
						avatar: 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
						likedNumber: 200,
						commentNumber: 10,
						repostNumber: 50
					},
					{
						image: {
							url: 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10748280_534094283392341_737416944_n.jpg'
						},
						avatar: 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
						likedNumber: 200,
						commentNumber: 10,
						repostNumber: 50
					},
					{
						image: {
							url: 'http://photos-e.ak.instagram.com/hphotos-ak-xaf1/10802508_1536357399940740_754952390_n.jpg'
						},
						avatar: 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg',
						likedNumber: 200,
						commentNumber: 10,
						repostNumber: 50
					}
				];

				deferrer.resolve(post);

				return deferrer.promise;
			}
		};
	})
	;