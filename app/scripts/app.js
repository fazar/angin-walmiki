'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('Lookats', ['ionic', 'config', 'lookats.controllers', 'lookats.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })
  /*.state('welcome', {
    url:'/welcome',
    templateUrl: 'templates/welcome.html'
  })*/
  .state('auth', {
    abstract: true,
    url: '/auth',
    templateUrl: 'templates/auth/layout.html'
  })
  .state('auth.login', {
    url: '/auth',
    templateUrl: 'templates/auth/login.html',
    controller: 'authCtrl'
  })
  .state('auth.register', {
    url: '/register',
    templateUrl: 'templates/auth/register.html',
    controller: 'authCtrl'
  })
  .state('auth.welcome', {
    url:'/welcome',
    templateUrl: 'templates/welcome.html'
  })
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/home/layout.html',
    controller: 'authCtrl'
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/timeline.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/home/camera.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('tab.profile', {
    url:'/profile',
    views: {
      'tab-home': {
        templateUrl: 'templates/profile/index.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('interest', {
    url:'/interest',
    templateUrl: 'templates/profile/interest.html',
    controller: 'profileCtrl'
  })
  .state('recommended-user', {
    url:'/recommended-user',
    templateUrl: 'templates/profile/recommended-user.html',
    controller: 'profileCtrl'
  })
  .state('new-post', {
    url: '/new-post',
    templateUrl: 'templates/post/create.html'
  })
  ;

  $urlRouterProvider.otherwise('/tab/home');

});
