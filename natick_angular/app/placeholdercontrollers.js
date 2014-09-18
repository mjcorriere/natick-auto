natickModule.controller('mainController', ['$scope', function($scope) {

  $scope.jobs = [
    {
      'id'  : '00145',
      'customer' : 'Draper Laboratory',
      'tests' : 'Break strength, Color fastness, Moisture absorption'
    },
    {
      'id'  : '00148',
      'customer' : 'Aperture Science',
      'tests' : 'Compressive strength, Rockwell hardness'
    },
    {
      'id'  : '00206',
      'customer' : 'Global Flight Systems',
      'tests' : 'Wind tunnel, flame retardance, impact resistance'
    }
  ];

}]);

natickModule.controller('joboverviewController', ['$scope', function($scope) {

}]);

natickModule.controller('breakstrengthController', ['$scope', function($scope) {

}]);