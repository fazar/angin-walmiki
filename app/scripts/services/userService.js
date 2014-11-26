angular.module('lookats.services')
	.factory('userService', function($rootScope, $state, $window, $http, $q) {
		'use strict';
		return {
			get: function() {
				var user = {};// = { username : '', fullname : '', followers : '', following : '' };

				$http.get(window.lookats.baseUrl + 'api/user')
				.success( function( data ) {
					user.username = data.username;
					user.fullname = data.fullname;
					user.followers = data.followers;
					user.following = data.following;
					user.cover = 'http://photos-f.ak.instagram.com/hphotos-ak-xaf1/10723966_363684577131445_1986852005_n.jpg';
					user.avatar = 'http://photos-d.ak.instagram.com/hphotos-ak-xpa1/923809_1566799786869227_1732260565_n.jpg';
				})
				.error( function() {
					
				});

				return user;
			},
			getTimeline: function () {
				var deferrer = $q.defer();
				
				$http.get(window.lookats.baseUrl + 'api/user/timeline')
				.success( function( data ) {
					var posts = [];
					var post = {};
					//console.log(data);
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
			posts: function() {
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