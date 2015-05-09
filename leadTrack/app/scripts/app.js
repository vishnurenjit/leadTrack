'use strict';

/**
 * @ngdoc overview
 * @name sos00App
 * @description
 * # sos00App
 *
 * Main module of the application.
 */
angular
  .module('sos00App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/tree', {
        templateUrl: 'views/tree.html',
        controller: 'TreeCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function ($rootScope, $location, NodeService) {
        Parse.initialize("4NTmY9kDlg1evU00IQe52BEYTyt51c8LUS3LkQSX", "xaaVDMvy2Kw0IJv454jpwJxGiplFAHtuqWDDAqhz");
        var currentUser = Parse.User.current();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        console.log(currentUser);

        if (currentUser) {
            $rootScope.user = currentUser;
            $rootScope.isLoggedIn = true;
            $location.path("/home");
        }
    });
