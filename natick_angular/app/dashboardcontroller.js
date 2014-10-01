natickModule.controller('dashboardController', 
  ['$scope', 'MockRetrievalService', function($scope, RetrievalService) {

  $scope.jobList = RetrievalService.getJobList();

}]);





