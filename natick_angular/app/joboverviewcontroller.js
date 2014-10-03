natickModule.controller('joboverviewController', 
  ['$scope', '$routeParams', 'RetrievalService', 
  function($scope, $routeParams, RetrievalService) {

    $scope.jobid          = $routeParams.jobid;

    $scope.customer       = RetrievalService.getCustomer($scope.jobid);
    $scope.pendingTests   = RetrievalService.getPendingTests($scope.jobid);
    $scope.completedTests = RetrievalService.getCompletedTests($scope.jobid);
    $scope.dueDate        = RetrievalService.getDueDate($scope.jobid)
    $scope.pctComplete    = Math.floor(100 * $scope.completedTests.length / ($scope.completedTests.length + $scope.pendingTests.length))

}]);