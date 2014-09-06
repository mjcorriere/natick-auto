'use strict'

// Instantiate the main module.
// Include the ngRoute (module / package / whatever ?)
var natickModule = angular.module('natick', ['ngRoute']);


natickModule.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl 	: 'partials/dashboard.html',
			controller 		: 'mainController'
		})
		.when('/joboverview', {
			templateUrl		: 'partials/joboverview.html',
			controller 		: 'joboverviewController'
		})
		.when('/createjob', {
			templateUrl 	: 'partials/jobcreation.html',
			controller 		: 'createjobController'
		})
		.when('/breakstrength', {
			templateUrl		: 'partials/breakstrength.html',
			controller 		: 'breakstrengthController'
		})
		.when('/testsrequired', {
			templateUrl		: 'partials/testsrequired.html',
			controller 		: 'testsrequiredController'
		});
	
});

natickModule.controller('mainController', ['$scope', function($scope) {

}]);

natickModule.controller('joboverviewController', ['$scope', function($scope) {

}]);

natickModule.controller('createjobController', ['$scope', function($scope) {

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);

natickModule.controller('testsrequiredController', ['$scope', function($scope) {

}]);