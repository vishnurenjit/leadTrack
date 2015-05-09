'use strict';

/**
 * @ngdoc function
 * @name sos00App.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the sos00App
 */
angular.module('sos00App')
  .controller('TreeCtrl', function ($scope, $timeout) {

    $scope.node = {};

    $scope.createNode = function(newNode){
      $('#nodeModal').modal('hide')
      console.log(newNode);
      $scope.treeData = [
        {
          "title": "Top Level",
          "parent": "null",
          "description": "Top Level description",
        "blocked": false,
          "children": [
            {
              "title": "Level 2: A",
              "parent": "Top Level",
              "description": "Level 2: A description",
          "blocked": false,
              "children": [
                {
                  "title": "Son of A",
                  "parent": "Level 2: A",
                  "description": "Son of A: A description",
            "blocked": false,
            "children": [
            {
              "title": "Son son of A",
              "parent": "Son of A",
              "description": "Son of son of A A description",
              "blocked": true
            },
            {
              "title": "Son son of A",
              "parent": "Son of A",
              "description": "Son of Son of A: A description",
              "blocked": false
            }
            ]
            },
                {
                  "title": "Daughter of A",
                  "parent": "Level 2: A",
                  "description": "Dau of A: A description",
            "blocked": false
                }
              ]
            },
            {
              "title": "Level 2: B",
              "parent": "Top Level",
              "description": "Level 2: B description",
          "blocked": false
            },
          {
              "title": "Level 2: B",
              "parent": "Top Level",
              "description": "Level 2: B description",
          "blocked": false
        },
        {
            "title": "Level 2: B",
            "parent": "Top Level",
            "description": "Level 2: B description",
        "blocked": false
          }
          ]
        }
      ];
      $scope.loadTree($scope.treeData);
      $scope.node = {};
    };

    $scope.editNode = function(newNode){
      $('#editNodeModal').modal('hide')
      console.log(newNode);
      $scope.treeData = [
        {
          "name": "Top Level",
          "parent": "null",
        "blocked": false,
          "children": [
            {
              "name": "Level 2: A",
              "parent": "Top Level",
          "blocked": false,
              "children": [
                {
                  "name": "Son of A",
                  "parent": "Level 2: A",
            "blocked": false
            },
                {
                  "name": "Daughter of A",
                  "parent": "Level 2: A",
            "blocked": true
                }
              ]
            },
            {
              "name": "Level 2: B",
              "parent": "Top Level",
          "blocked": false
            },
          {
              "name": "Level 2: B",
              "parent": "Top Level",
          "blocked": false
        },
        {
            "name": "Level 2: B",
            "parent": "Top Level",
        "blocked": false
          }
          ]
        }
      ];
      $scope.loadTree($scope.treeData);
    };

    $scope.loadTree = function(treeData){
      $("#tree").empty();
      // ************** Generate the tree diagram	 *****************
      var margin = {top: 100, right: 10, bottom: 10, left: 10},
      	width = 1000 - margin.right - margin.left,
      	height = 1000 - margin.top - margin.bottom;

      var i = 0;

      var tree = d3.layout.tree()
      	.size([height, width]);

      var diagonal = d3.svg.diagonal()
      	.projection(function(d) { return [d.x, d.y]; });

      var svg = d3.select("#tree").append("svg")
      	.attr("width", width + margin.right + margin.left)
      	.attr("height", height + margin.top + margin.bottom)
        .append("g")
      	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      	/* Initialize tooltip */
      tip = d3.tip().attr('class', 'd3-tip')
      	.offset([-10, 0])
      	.html(function(d) {
      		return "<strong>Name:</strong> <span style='color:#7A995C'>" + d.title + "</span><br>" +
      				"<strong>Name:</strong> <span style='color:#7A995C'>"+ d.description +"</span><br>" +
      				"<strong>Name:</strong> <span style='color:#7A995C'>" + d.status + "</span><br>";
      	});

      /* Invoke the tip in the context of your visualization */
      svg.call(tip);

      root = treeData[0];

      update(root);

      function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
      	  links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 100; });

        // Declare the nodes…
        var node = svg.selectAll("g.node")
      	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
      	  .attr("class", "node")
      	  .attr("transform", function(d) {
      		  return "translate(" + d.x + "," + d.y + ")"; });

        nodeEnter.append("circle")
      	  .attr("r", 20)
      	  .style("fill", function(d){if(d.blocked) return "#FF3333"; else return "#006B24";})
      	  .on("click", function(d){
      		// alert("Clicked");
            $scope.node = d;
            $('#optionsModal').modal('show');
            $scope.$apply();
      	   })
      	  .on('mouseover', tip.show)
      	  .on('mouseout', tip.hide);

        nodeEnter.append("text")
      	  .attr("y", function(d) {
      		  return d.children || d._children ? -28 : 28; })
      	  .attr("dy", ".35em")
      	  .attr("text-anchor", "middle")
      	  .text(function(d) { return d.title; })
      	  .style("fill-opacity", 1);

        // Declare the links…
        var link = svg.selectAll("path.link")
      	  .data(links, function(d) { return d.target.id; });

        // Enter the links.
        link.enter().insert("path", "g")
      	  .attr("class", "link")
      	  .attr("d", diagonal);

      }

    }

    $timeout(function(){
      $scope.treeData = [
        {
          "title": "Top Level",
          "parent": "null",
          "description": "Top Level description",
        "blocked": false,
          "children": [
            {
              "title": "Level 2: A",
              "parent": "Top Level",
              "description": "Level 2: A description",
          "blocked": false,
              "children": [
                {
                  "title": "Son of A",
                  "parent": "Level 2: A",
                  "description": "Son of A: A description",
            "blocked": false,
            "children": [
            {
              "title": "Son son of A",
              "parent": "Son of A",
              "description": "Son of son of A A description",
              "blocked": true
            },
            {
              "title": "Son son of A",
              "parent": "Son of A",
              "description": "Son of Son of A: A description",
              "blocked": false
            }
            ]
            },
                {
                  "title": "Daughter of A",
                  "parent": "Level 2: A",
                  "description": "Dau of A: A description",
            "blocked": true
                }
              ]
            },
            {
              "title": "Level 2: B",
              "parent": "Top Level",
              "description": "Level 2: B description",
          "blocked": true
            },
          {
              "title": "Level 2: B",
              "parent": "Top Level",
              "description": "Level 2: B description",
          "blocked": true
        },
        {
            "title": "Level 2: B",
            "parent": "Top Level",
            "description": "Level 2: B description",
        "blocked": false
          }
          ]
        }
      ];
      $scope.loadTree($scope.treeData);
    }, 10);

  });
