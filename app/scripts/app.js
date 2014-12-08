'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('Lookats', ['ionic', 'config', 'lookats.controllers', 'lookats.services', 'ngImgCrop'])
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
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider  
  .state('welcome', {
    url:'/welcome',
    templateUrl: 'templates/welcome/index.html'
  })
  .state('welcome.intro', {
    url: '/',
    templateUrl: 'templates/welcome/intro.html',
    controller: 'WelcomeIntroCtrl'
  })  
  .state('welcome-login', {
    url: '/login',
    templateUrl: 'templates/welcome/login.html',
    controller: 'WelcomeLoginCtrl'
  })
  .state('welcome-register', {
    url: '/register',
    templateUrl: 'templates/welcome/register.html',
    controller: 'WelcomeRegisterCtrl'
  })  
  .state('welcome-interest', {
    url:'/interest',
    templateUrl: 'templates/welcome/interest.html',
    controller: 'WelcomeInterestCtrl'
  })
  .state('welcome-recommendedUser', {
    url:'/recommendeduser',
    templateUrl: 'templates/welcome/recommendedUser.html',
    controller: 'WelcomeRecommendedUserCtrl'
  })


  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: 'templates/dashboard.html',
    controller: 'DashboardCtrl'
  })


  .state('dashboard.home', {
    url: '/home',
    views: {
      'dashboard-home': {
        templateUrl: 'templates/home/index.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('dashboard.home-profile', {
    url:'/profile/:id',
    views: {
      'dashboard-home': {
        templateUrl: 'templates/home/profile.html',
        controller: 'HomeProfileCtrl'
      }
    }
  })


  .state('dashboard.discover', {
    url: '/discover',
    views: {
      'dashboard-discover': {
        templateUrl: 'templates/discover/index.html',
        controller: 'DiscoverCtrl'
      }
    }
  })


  .state('dashboard.photo', {
    url: '/photo',
    views: {
      'dashboard-photo': {
        templateUrl: 'templates/photo/index.html',
        controller: 'PhotoCtrl'
      }
    }
  })
  .state('dashboard.photo.crop', {
    url: '/crop',
    templateUrl: 'templates/photo/crop.html',
    controller: 'CropCtrl'
  })
  .state('dashboard.photo.post', {
    url: '/post',
    templateUrl: 'templates/photo/post.html'
  })


  .state('dashboard.notification', {
    url: '/notification',
    views: {
      'dashboard-notification': {
        templateUrl: 'templates/notification/index.html',
        controller: 'NotificationCtrl'
      }
    }
  })


  .state('dashboard.profile', {
    url:'/profile/',
    views: {
      'dashboard-profile': {
        templateUrl: 'templates/profile/index.html',
        controller: 'ProfileCtrl'
      }
    }
  })


  .state('dashboard.account', {
    url: '/account',
    views: {
      'dashboard-account': {
        templateUrl: 'templates/account/index.html'
      }
    }
  })
  ;

  //$urlRouterProvider.otherwise('/dashboard/home');
  $urlRouterProvider.otherwise('/welcome');

});
