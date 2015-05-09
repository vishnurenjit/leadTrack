'use strict';

angular.module('sos00App')

  .factory('OrgService', function () {
  	var o = {allOrg : [], clsName : "Organization", map : []};



	o.loadAllOrganization = function(qrySuccess) {
		var query = new Parse.Query(o.clsName);

		query.find({
		  success: function(results) {o.allOrg = results;},
		  error: function(error) {
		    
		  }
		});	
	}


	return o;

  });