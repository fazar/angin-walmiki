angular.module('lookats.services')
	.factory('WelcomeService', function($q, $http, $window) {
		'use strict';
		return {
			
			login: function(username, password) {
				var deferrer = $q.defer();				
				var userData = { username : username, password : password };
				var result = {};
				$http.post(window.lookats.baseUrl + 'api/authenticate', userData)
				.success( function( data ) {
					$window.localStorage.token = data.token;
					result.success = true;
					deferrer.resolve(result);
				})
				.error( function() {
					delete $window.localStorage.token;
					result.success = false;
					deferrer.resolve(result);
				});

				return deferrer.promise;
			},

			register: function(registerViewModel) {
				var deferrer = $q.defer();
				var result = {};
				$http.post(window.lookats.baseUrl + 'api/register', registerViewModel)
				.success( function( data ) {
					result.success = true;
					deferrer.resolve(result);
				})
				.error( function() {
					result.success = false;
					deferrer.resolve(result);
				});
				return deferrer.promise;
			}

		};
	});