'use strict';

angular.module('sos00App')

  .factory('RoleService', function () {
  	var o = {
  		allRoles : [],
  		map : {}, 
  		names : [],
  		_SA : "Super Admin", 
  		_CA : "Admin", 
  		_USR : "User"
  	};


	o.loadAllRoles = function(qrySuccess) {
		var query = new Parse.Query(Parse.Role);

		query.find({
		  success: function(results) {
		    o.allRoles = results;
			for (var i = 0; i < results.length; i++) {
				o.map[results[i].get("name")] = results[i];
				o.names.unshift(results[i].get("name"));
		    }
		    qrySuccess(o.names);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});	
	}


	return o;

  });
