natickModule.controller('visualshadeController', 
  ['$scope', '$location', '$routeParams', 'VisualShadeService', 'TestSummaryService',
  function($scope, $location, $routeParams, VisualShadeService, TestSummaryService) {

    $scope.jobid        = $routeParams.jobid;
    VisualShadeService.retrieveData($scope.jobid);
    TestSummaryService.retrieveData($scope.jobid, 'Visual shade');

    $scope.nomenclature     = TestSummaryService.nomenclature();
    $scope.dueDate          = TestSummaryService.dueDate();
    $scope.testMethod       = TestSummaryService.testMethod();
    $scope.specLimit        = TestSummaryService.specLimit();

    $scope.testData     = VisualShadeService.testData();
    console.log($scope.testData);
    
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