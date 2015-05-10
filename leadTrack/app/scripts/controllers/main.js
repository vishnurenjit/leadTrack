'use strict';

/**
 * @ngdoc function
 * @name sos00App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sos00App
 */
angular.module('sos00App').controller('MainCtrl', function ($scope, $location, $rootScope, BoardService, NodeService) {

    $scope.user = {};
    $scope.boards = [];
    $scope.board = {label : null, description : null}

  	$scope.logout = function() {
        Parse.User.logOut();
        $location.path('/login');
    };

    $scope.showAddBox = function() { //alert();
      $('#addBoard').modal('show');
    }

    $scope.addBoard = function() {
      var svBoard = BoardService.createBoard();
      console.log("svBoard : " + svBoard);
      var root = NodeService.createNode($scope.board.label, $scope.board.description);
      svBoard.set("root", root);
      console.log("svBoard : " + svBoard);
      BoardService.saveBoard(svBoard, function(svBoard) {
      console.log("svBoard : " + svBoard);
        $scope.boards.unshift({
          label: $scope.board.lable, createdOn : svBoard.get("createdDate"), description : $scope.board.description
        });

      });

    }

    $scope.passRoot = function(root) { //alert();
      console.log(root);
      NodeService.setCurrentNode(root);
      $location.path('/tree');
    }

    BoardService.getBoards(function(boards) {
      for (var i = boards.length - 1; i >= 0; i--) {
        buidModal(boards[i], function(obj) {
          console.log(obj);
          $scope.boards.unshift(obj);
          $rootScope.$digest();
        });
      };
      //$rootScope.

    })


    var buidModal = function(board, clBk) {
      var node = board.get("root");

      node.fetch({
        success: function(node) {
          var label = node.get("label");
          var description = node.get("description");
          var dt = board.get("createdDate");

          clBk({label: label, createdOn : dt, description : description, root: node});

          }
        })
      };


  });
