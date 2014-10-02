'use strict'

var Global = {
	DEBUG : false,
	dbUrl : 'http://natick2.draper.com/main'
};

// Instantiate the main module.
// Include the ngRoute (module / package / whatever ?)
var natickModule = angular.module('natick', ['ngRoute', 'flatuiApp.directives']);
angular.module('flatuiApp.directives', []);

natickModule.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl 	: 'partials/dashboard.html',
			controller 		: 'dashboardController'
		})
		.when('/joboverview', {
			templateUrl		: 'partials/joboverview.html',
			controller 		: 'joboverviewController'
		})
		.when('/createjob', {
			templateUrl 	: 'partials/jobcreation.html',
			controller 		: 'createjobController'
		})
		.when('/createjob/step1', {
			templateUrl		: 'partials/step1.html',
			controller 		: 'createjobController'
		})
		.when('/createjob/step2', {
			templateUrl 	: 'partials/step2.html',
			controller 		: 'createjobController'
		})
		.when('/createjob/step3', {
			templateUrl 	: 'partials/step3.html',
			controller 		: 'createjobController'
		})
		.when('/createjob/step4', {
			templateUrl		: 'partials/step4.html',
			controller 		: 'createjobController'
		})
		.when('/job/:jobid/breakstrength', {
			templateUrl		: 'partials/breakstrength.html',
			controller 		: 'breakstrengthController'
		})
		.when('/job/:jobid/visualshade', {
			templateUrl 	: 'partials/visualshade.html',
			controller 		: 'visualshadeController'
		})
		.when('/testsrequired', {
			templateUrl		: 'partials/testsrequired.html',
			controller 		: 'testsrequiredController'
		})
		.when('/job/:jobid', {
			templateUrl		: 'partials/joboverview.html',
			controller 		: 'joboverviewController'
		});
	
});