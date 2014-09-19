natickModule.controller('mainController', ['$scope', 'MockRetrievalService', function($scope, RetrievalService) {

  $scope.jobs = RetrievalService.getAllJobs();

}]);

natickModule.controller('joboverviewController', ['$scope', '$routeParams', 
  function($scope, $routeParams) {

    $scope.jobid = $routeParams.jobid;

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);