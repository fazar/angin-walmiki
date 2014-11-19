angular.module('lookats.services')
	.factory('userService', ['$rootScope', '$state', '$window', '$http', function($rootScope, $state, $window, $http) {
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
			}
		};
	}])
	;