'use strict';

angular.module('lunarPhases', ['ngAnimate', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngGeolocation'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
