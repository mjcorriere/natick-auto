natickModule.controller('mainController', 
  ['$scope', 'MockRetrievalService', function($scope, RetrievalService) {

  $scope.jobList = RetrievalService.getJobList();

}]);

natickModule.controller('joboverviewController', 
  ['$scope', '$routeParams', 'MockRetrievalService', 
  function($scope, $routeParams, RetrievalService) {

    $scope.jobid = $routeParams.jobid;

    $scope.customer     = RetrievalService.getCustomer($scope.jobid);
    $scope.pendingTests = RetrievalService.getPendingTests($scope.jobid);
    $scope.completedTests = RetrievalService.getCompletedTests($scope.jobid);

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);