'use strict';

/**
 * @ngdoc function
 * @name sos00App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sos00App
 */
angular.module('sos00App').controller('MainCtrl', function ($scope, $location, BoardService) {

    $scope.user = {};
    $scope.board = {lable : null, description : null}

  	$scope.logout = function() {
        Parse.User.logOut();
        $location.path('/login');
    };

    $scope.showAddBox = function() { //alert();
      $('#addBoard').modal('show');
    }

    $scope.addBoard = function() { //alert();
      
    }


    $scope.boards = [
      {label: "label 1", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"},
      {label: "label 2", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"},
      {label: "label 3", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"},
      {label: "label 4", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"},
      {label: "label 5", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"},
      {label: "label 6", createdOn : new Date(), description : "gfvhvfjbvjvjhvhjvjhcvhcvhhjvhvjvj"}
    ]




  });
