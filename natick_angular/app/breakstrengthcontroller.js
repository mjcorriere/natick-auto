natickModule.controller('breakstrengthController', 
  ['$scope', '$location', '$routeParams', 'MockRetrievalService', 'BreakStrengthService',
  function($scope, $location, $routeParams, RetrievalService, BreakStrengthService) {

    $scope.jobid            = $routeParams.jobid;

    // Pull these from DB

    $scope.nomenclature     = 'Cloth, 50/50 Nylon and Cotton';
    $scope.spec             = 'Mil-C-1001';
    $scope.testMethod       = 'ASTM-D-5034';

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