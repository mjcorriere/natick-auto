'use strict'

// Instantiate the main module.
// Include the ngRoute (module / package / whatever ?)
var natickModule = angular.module('natick', ['ngRoute']);

natickModule.factory('FormService', function() {
	
	var formData = {
		subtests 	: 	{
			breakstrength : {required: false},
			visualshade		: {required: false}
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

	// $scope.$watch(function() {
	// 	return $(":checkbox[name='checkbox1']").prop('checked');
	// }, function(newVal, oldVal) {
	// 	console.log(newVal, oldVal);
	// });

	// For debug only.
	$scope.$watch('formData', function() {
		$scope.ppFormData = JSON.stringify($scope.formData, null, 2);
	}, true);
	
	// jQuery nonsense. These should be turned into AngularJS directives, 
	// but who has the time for such things?

	$(':checkbox').checkbox();

	$("select")
		.selectpicker({style: 'btn-default'})
		.on('change', function() {
			var self = this;
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

		$("select[name='breakstrength']").on('change', function() {
			var self = this;
			// Hacky, but you gotta do what you gotta do
			$scope.$apply(function() {
				$scope.formData.subtests.breakstrength.testmethod = self.value;
			});
		});

		$("select[name='visualshade']").on('change', function() {
			var self = this;
			// Hacky, but you gotta do what you gotta do
			$scope.$apply(function() {
				$scope.formData.subtests.visualshade.testmethod = self.value;
			});
		});		

	// <old> Do not uncomment
	// $('label').on('click', function() {
	// </old>
	
	$(':checkbox').on('change', function() {			

			var name = $(this).attr('name');
			var isChecked = $(this).prop('checked');
			var testOptions = $('.testoptions.' + name);

			if(isChecked) {
				testOptions.css('display', 'block');
			} else {
				testOptions.css('display', 'none');
			}
			console.log('changed');
			$scope.$apply(function() {
				console.log($scope.formData.subtests.breakstrength.required);
			});

	});

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);

// natickModule.controller('testsrequiredController', ['$scope', function($scope) {
// 	$(':checkbox').checkbox();
// 	$("select")
// 		.selectpicker({style: 'btn-default'})
// 		.on('change', function() {
// 			if (this.value !== '0') {
// 				$(this).next()
// 					.children('.btn.dropdown-toggle')
// 					.addClass('btn-inverse')
// 					.removeClass('btn-default');
// 			} else {
// 				$(this).next()
// 					.children('.btn.dropdown-toggle')
// 					.addClass('btn-default')
// 					.removeClass('btn-inverse');
// 			}
// 		});

// 	$('label').on('click', function() {
			
// 			/* This onClick function appears to execute prior to whatever
// 			 * the flat-ui-checkbox JS is doing. Therefore the value of 'checked'
// 			 * lags behind the true value. For that reason the boolean logic here
// 			 * appears to be inverted.
// 			 *
// 			 */

// 			var name = $(this).attr('for');
// 			var isChecked = $(this).children('#' + name).prop('checked');

// 			var testOptions = $('.testoptions.' + name);

// 			if(!isChecked) {
// 				testOptions.css('display', 'block');
// 			} else {
// 				testOptions.css('display', 'none');
// 			}

// 	});

// }]);