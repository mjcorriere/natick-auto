natickModule.controller('breakstrengthController', 
  ['$scope', '$location', '$routeParams', 'RetrievalService', 'BreakStrengthService',
  function($scope, $location, $routeParams, RetrievalService, BreakStrengthService) {

    $scope.jobid            = $routeParams.jobid;

    BreakStrengthService.retrieveData($scope.jobid);

    // Assume nothing is requried. Ask DB
    $scope.isWarpRequired   = BreakStrengthService.isWarpRequired();
    $scope.isFillRequired   = BreakStrengthService.isFillRequired();
    $scope.areBothRequired  = $scope.isWarpRequired && $scope.isFillRequired;

    // Pull these from DB

    $scope.nomenclature     = BreakStrengthService.nomenclature();
    // $scope.spec             = BreakStrengthService.specification();
    $scope.dueDate          = RetrievalService.getDueDate($scope.jobid);
    $scope.testMethod       = BreakStrengthService.testMethod();
    $scope.specLimit        = BreakStrengthService.specLimit();

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