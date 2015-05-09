'use strict';

/**
 * @ngdoc function
 * @name sos00App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sos00App
 */
angular.module('sos00App')
  .controller('LoginCtrl', function ($scope, $location, $rootScope) {
    $scope.user = {
        username: null,
        password: null
    };
  	$scope.loginError = false;
  	$scope.errorMessage = '';


  	$scope.login = function(user) {
  		$scope.errorMessage = '';
  		console.log(user.username + ' - ' + user.password);
  		Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
            success: function(user) {
            	$rootScope.$apply(function() {
  			        $location.path('/home');
  			        console.log($location.path());
  			      });
            },
            error: function(user, err) {
            	$scope.errorMessage = err.message;
            	$scope.loginError = true;
            }
        });
  	};

    $scope.showBox = function() { //alert();
      $('#register').modal('show');
    }

    $scope.register = function() {

      console.log("inside register");
      var userMdl = $scope.user;
      var user = new Parse.User();
      user.set("username", userMdl.username);
      user.set("password", userMdl.password);

      user.signUp(null, {
          success: function(user) {
            console.log("success");
              $rootScope.$apply(function() {
                $location.path('/home');
                console.log($location.path());
              });
          },
          error: function(user, error) {
              if (error.code === 125) {
                  // $scope.errorMessage = 'Please specify a valid email ' +
                  //     'address';

                   alert("Please specify a valid email");
              } else if (error.code === 202) {
                  // $scope.errorMessage = 'The email address is already ' +
                  //     'registered';
                  alert("The email address is already registered");
              } else {
                  // $scope.errorMessage = error.message;
                  alert(error.message);
              }
              $scope.$apply();
          }
      });
    }
  });