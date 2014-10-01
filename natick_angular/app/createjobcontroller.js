
natickModule.controller('createjobController', 
  ['$scope', 'FormService', function($scope, FormService) {

  $scope.$on('$routeChangeStart', function(event, next, current) {
    
    var next = next.$$route.originalPath;

    if (next.indexOf('createjob') < 0) {
      // Yes/no prompt goes here. Warn of data loss.
      console.log('User navigated away from form creation');
      FormService.reset();
    }

    console.log('Current: ' + current);
    console.log('Next: ' + next);   
    
  });

  $scope.formData = FormService.formData();
  $scope.submit = FormService.submit;
  $scope.ppFormData = null;

  $scope.test = '0';
  
  if (Global.DEBUG) {
    $scope.$watch('formData', function() {
      $scope.ppFormData = JSON.stringify($scope.formData, null, 2);
    }, true);
  }
  
}]);