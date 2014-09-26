natickModule.controller('mainController', 
  ['$scope', 'MockRetrievalService', 'RetrievalService', function($scope, RetrievalService, rs) {

  $scope.jobList = RetrievalService.getJobList();

  rs.getJobList();

  // $scope.jobList = [];
  // RetrievalService.getJobList()
  //  .done(function(data) {
  //    $scope.jobList = data;
  // });

}]);

natickModule.controller('joboverviewController', 
  ['$scope', '$routeParams', 'MockRetrievalService', 
  function($scope, $routeParams, RetrievalService) {

    $scope.jobid = $routeParams.jobid;

    $scope.customer     = RetrievalService.getCustomer($scope.jobid);
    $scope.pendingTests = RetrievalService.getPendingTests($scope.jobid);
    $scope.completedTests = RetrievalService.getCompletedTests($scope.jobid);

}]);

natickModule.controller('breakstrengthController', 
  ['$scope', '$routeParams', 'MockRetrievalService', 'BreakStrengthService',
  function($scope, $routeParams, RetrievalService, BreakStrengthService) {

    $scope.jobid            = $routeParams.jobid;

    $scope.nomenclature     = 'Cloth, 50/50 Nylon and Cotton';
    $scope.spec             = 'Mil-C-1001';
    $scope.testMethod       = 'ASTM-D-5034';

    $scope.warpTest         = BreakStrengthService.warpTest();
    $scope.fillTest         = BreakStrengthService.fillTest();

    $scope.addWarpSample    = BreakStrengthService.addWarpSample;
    $scope.removeWarpSample = BreakStrengthService.removeWarpSample;

    $scope.addFillSample    = BreakStrengthService.addFillSample;
    $scope.removeFillSample = BreakStrengthService.removeFillSample;

}]);