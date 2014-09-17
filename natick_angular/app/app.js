'use strict'

var DEBUG = true;

// Instantiate the main module.
// Include the ngRoute (module / package / whatever ?)
var natickModule = angular.module('natick', ['ngRoute', 'flatuiApp.directives']);
angular.module('flatuiApp.directives', []);

natickModule.config(function($routeProvider) {
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
		.when('/breakstrength', {
			templateUrl		: 'partials/breakstrength.html',
			controller 		: 'breakstrengthController'
		})
		.when('/testsrequired', {
			templateUrl		: 'partials/testsrequired.html',
			controller 		: 'testsrequiredController'
		});
	
});