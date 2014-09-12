'use strict'

var DEBUG = true;

// Instantiate the main module.
// Include the ngRoute (module / package / whatever ?)
var natickModule = angular.module('natick', ['ngRoute', 'flatuiApp.directives']);
angular.module('flatuiApp.directives', []);

natickModule.factory('FormService', function() {
	
	var formData = {
		subtests: {
			breakstrength: {
				required: false
				, warp: false
				, fill: false
				, testMethod: '0'
			},
			visualshade: {
				required: false
				, testMethod: '0'
			}
		}
	};
	
	var FormService = {};

	FormService.formData = function() {
		return formData;
	}

	return FormService;

});

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

natickModule.controller('createjobController', ['$scope', 'FormService', function($scope, FormService) {

	$scope.formData = FormService.formData();
	$scope.ppFormData = null;

	$scope.test = '0';

	$scope.tests = {
		breakstrength: {
			name: 'Break Strength'
			, id: 'breakstrength'
			, selected: false
		}, 
		visualshade: {
			name: 'Visual Shade Evaluation'
			, id: 'visualshade'
			, selected: false
		}
	};

	
	if (DEBUG) {
		$scope.$watch('formData', function() {
			$scope.ppFormData = JSON.stringify($scope.formData, null, 2);
		}, true);
	}
	

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);