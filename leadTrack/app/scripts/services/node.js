'use strict';

angular.module('sos00App')
  .factory('NodeService', function () {
  	var o = {currentNode : null};

  	
  	o.setCurrentNode = function(node) {
  		o.currentNode = node;
  	}

  	o.getCurrentNode = function(node) {
  		return o.currentNode;
  	}



  	var Node = Parse.Object.extend("Node");

  	o.createNode = function(label, description) {
  		var node = new Node();
  		node.set("label", label);
  		node.set("description", description);
  		return node;
  	}

  	o.saveNode = function(node, parent, svSuccess, svError) {
  		node.set("createdDate", new Date());
  		node.set("parent", parent);

  		node.save(null, {
		  success: function(node) {
		  	svSuccess(node);
		  },
		  error: function(node, error) {
		  	svError(node, error);
		  }
		});
  	}

  	o.getNodes = function(parent, qrySuccess) {
  		var query = new Parse.Query(Node);
		query.equalTo("parent", parent);
		query.find({
		  success: function(nodes) {
		    qrySuccess(parent, nodes);
		  }
		});
  	}

  	o.getTree = function(root) {
  		o.getNodes(root, rec);
  	}

  	var rec = function(parent, nodes) {
  			parent.children = nodes;
  			var i = 0;
  			for(i = 0; i < nodes.length; i++) {
  				o.getNodes(nodes[i], rec);
  			}
  		}

  	return o;
  });