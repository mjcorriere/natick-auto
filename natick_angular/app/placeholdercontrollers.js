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
  ['$scope', 'MockRetrievalService', function($scope, RetrievalService) {



}]);