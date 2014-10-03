
natickModule.controller('createjobController', 
  ['$scope', '$location', '$timeout', 'FormService', 
  function($scope, $location, $timeout, FormService) {

  var submittingForm = false;
  $scope.submitted = false;

  $scope.$on('$routeChangeStart', function(event, next, current) {
    
    var next = next.$$route.originalPath;

    if (next.indexOf('createjob') < 0 && !submittingForm) {
      // Yes/no prompt goes here. Warn of data loss.
      console.log('User navigated away from form creation');
      //FormService.reset();
    }

    console.log('Current: ' + current);
    console.log('Next: ' + next);   
    
  });

  $scope.formData = FormService.formData();
  $scope.submit = function() {
    FormService.submit(false);
    submittingForm = true;
    // Hacky hack hack. 
    // TODO: Chain promises in the controller instead of service.
    $timeout(function() {
      console.log('TIMING OUT MAN');
      $location.path('/');
    }, 500);
  }

  $scope.debugSubmit = function() {
    FormService.submit(true);
    submittingForm = true;
    $timeout(function() {
      console.log('TIMING OUT MAN');
      $location.path('/');
    }, 500);    
  }
  

  $scope.validateStep1 = function() {
    console.log('validate step1');
    $scope.submitted = true;
    console.log($scope.step1form.$invalid);
    if (!$scope.step1form.$invalid) {
      $location.path('/createjob/step2');
    }
  }

  $scope.validateStep2 = function() {
    console.log('validate step2');
    $scope.submitted = true;
    console.log($scope.step2form.$invalid);
    if (!$scope.step2form.$invalid) {
      $location.path('/createjob/step3');
    }
  }

  $scope.validateStep3 = function() {
    console.log('validate step3');
    $scope.submitted = true;
    console.log($scope.step3form.$invalid);
    if (!$scope.step3form.$invalid) {
      // submit the form
      console.log('SUBMIT THE FORM. CODE IT UP');
    }
  }

  $scope.ppFormData = null;

  if (Global.DEBUG) {
    $scope.$watch('formData', function() {
      $scope.ppFormData = JSON.stringify($scope.formData, null, 2);
    }, true);
  }
  
}]);