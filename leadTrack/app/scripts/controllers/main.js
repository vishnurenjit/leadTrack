'use strict';

/**
 * @ngdoc function
 * @name sos00App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sos00App
 */
angular.module('sos00App').controller('MainCtrl', function ($scope, $location) {

    $scope.user = {};

  	$scope.logout = function() {
        Parse.User.logOut();
        $location.path('/login');
    };

  });
