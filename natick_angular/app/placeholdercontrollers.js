natickModule.controller('mainController', 
  ['$scope', 'MockRetrievalService', 'RetrievalService', function($scope, RetrievalService, rs) {

  $scope.jobList = RetrievalService.getJobList();

  $scope.testList = rs.getJobList();

  // $scope.jobList = [];
  // RetrievalService.getJobList()
  //  .done(function(data) {
  //    $scope.jobList = data;
  // });

}]);

natickModule.controller('joboverviewController', 
  ['$scope', '$routeParams', 'MockRetrievalService', 
  function($scope, $routeParams, RetrievalService) {

    $scope.jobid          = $routeParams.jobid;

    $scope.customer       = RetrievalService.getCustomer($scope.jobid);
    $scope.pendingTests   = RetrievalService.getPendingTests($scope.jobid);
    $scope.completedTests = RetrievalService.getCompletedTests($scope.jobid);

}]);

natickModule.controller('breakstrengthController', 
  ['$scope', '$location', '$routeParams', 'MockRetrievalService', 'BreakStrengthService',
  function($scope, $location, $routeParams, RetrievalService, BreakStrengthService) {

    $scope.jobid            = $routeParams.jobid;

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