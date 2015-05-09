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

    $scope.loadModal = function() {
    	console.log("Add user clicked");    	
    	$('#addUser').modal('show');
    }

    $scope.addUser = function() {
      var user = $scope.user;
    }

    $scope.saveUser = function() {
      var file = $('.fileinput').fileinput();
      console.log(file);
    };

    var generatePassword = function() {
      return "pass"
    }




  $scope.loadUser = function(index) { alert();
    $scope.currentUser = $scope.friends[index];
     
  }




  });
