natickModule.controller('joboverviewController', 
  ['$scope', '$routeParams', 'MockRetrievalService', 
  function($scope, $routeParams, RetrievalService) {

    $scope.jobid          = $routeParams.jobid;

    $scope.customer       = RetrievalService.getCustomer($scope.jobid);
    $scope.pendingTests   = RetrievalService.getPendingTests($scope.jobid);
    $scope.completedTests = RetrievalService.getCompletedTests($scope.jobid);

}]);