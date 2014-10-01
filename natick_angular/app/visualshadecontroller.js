natickModule.controller('visualshadeController', 
  ['$scope', '$location', '$routeParams', 'VisualShadeService',
  function($scope, $location, $routeParams, VisualShadeService) {

    $scope.jobid        = $routeParams.jobid;

    $scope.testData     = VisualShadeService.testData();
    
    $scope.removeSample = VisualShadeService.removeSample;
    $scope.addSample    = VisualShadeService.addSample;

    $scope.completeTest = function() {
      VisualShadeService.completeTest();
      $location.path('job/' + $scope.jobid);
    }

    $scope.$on('$routeChangeStart', function(event, next, current) {
      VisualShadeService.saveData();
    });

}]);