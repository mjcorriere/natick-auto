natickModule.controller('dashboardController', 
  ['$scope', 'RetrievalService', function($scope, RetrievalService) {

  $scope.jobList = RetrievalService.getJobList();
  console.log('Job list: ', $scope.jobList);

}]);





