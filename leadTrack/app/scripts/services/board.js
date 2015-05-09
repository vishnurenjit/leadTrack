'use strict';

angular.module('sos00App')
  .factory('BoardService', function ($rootScope) {
  	var o = {};
  	var Board = Parse.Object.extend("Board");

  	o.createBoard = function() {
  		var board = new Board();
  		board.set("createdBy", $rootScope.user);
  		return board;
  	}

  	o.saveBoard = function(board, svSuccess, svError) {
  		board.set("createdDate", new Date());
  		board.save(null, {
		  success: function(board) {
		  	svSuccess(board);
		  },
		  error: function(board, error) {
		  	svError(board, error);
		  }
		});
  	}

  	o.getBoards = function(qrySuccess) {
  		var query = new Parse.Query(Board);
		query.equalTo("createdBy", $rootScope.user);
		query.find({
		  success: function(boards) {
		    qrySuccess(boards);
		  }
		});
  	}

  	return o;
  });