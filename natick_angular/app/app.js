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
	$(':checkbox').checkbox();
	$("select")
		.selectpicker({style: 'btn-default'})
		.on('change', function() {
			if (this.value !== '0') {
				$(this).next()
					.children('.btn.dropdown-toggle')
					.addClass('btn-inverse')
					.removeClass('btn-default');
			} else {
				$(this).next()
					.children('.btn.dropdown-toggle')
					.addClass('btn-default')
					.removeClass('btn-inverse');
			}
		});

	$('label').on('click', function() {
			
			/* This onClick function appears to execute prior to whatever
			 * the flat-ui-checkbox JS is doing. Therefore the value of 'checked'
			 * lags behind the true value. For that reason the boolean logic here
			 * appears to be inverted.
			 *
			 */

			var name = $(this).attr('for');
			var isChecked = $(this).children('#' + name).prop('checked');

			var testOptions = $('.testoptions.' + name);

			if(!isChecked) {
				testOptions.css('display', 'block');
			} else {
				testOptions.css('display', 'none');
			}

	});
}]);