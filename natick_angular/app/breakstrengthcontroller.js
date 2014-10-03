natickModule.controller('breakstrengthController', 
  ['$scope', '$location', '$routeParams', 'RetrievalService', 'BreakStrengthService', 'TestSummaryService',
  function($scope, $location, $routeParams, RetrievalService, BreakStrengthService, TestSummaryService) {

    $scope.jobid            = $routeParams.jobid;

    BreakStrengthService.retrieveData($scope.jobid);
    TestSummaryService.retrieveData($scope.jobid);

    // Assume nothing is requried. Ask DB
    $scope.isWarpRequired   = BreakStrengthService.isWarpRequired();
    $scope.isFillRequired   = BreakStrengthService.isFillRequired();
    $scope.areBothRequired  = $scope.isWarpRequired && $scope.isFillRequired;

    // Pull these from DB

    $scope.nomenclature     = TestSummaryService.nomenclature();
    $scope.dueDate          = TestSummaryService.dueDate();
    $scope.testMethod       = TestSummaryService.testMethod();
    $scope.specLimit        = TestSummaryService.specLimit();

    $scope.warpTest         = BreakStrengthService.warpTest($scope.jobid);
    $scope.fillTest         = BreakStrengthService.fillTest($scope.jobid);

    $scope.addWarpSample    = BreakStrengthService.addWarpSample;
    $scope.removeWarpSample = BreakStrengthService.removeWarpSample;

    $scope.addFillSample    = BreakStrengthService.addFillSample;
    $scope.removeFillSample = BreakStrengthService.removeFillSample;

    $scope.completeTest     = function() {
      BreakStrengthService.completeTest();
      $location.path('job/' + $scope.jobid);
    }

    $scope.$on('$routeChangeStart', function(event, next, current) {
      BreakStrengthService.saveData();
    });

}]);