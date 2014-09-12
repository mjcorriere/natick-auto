(function() {
  angular.module('flatuiApp.controllers')
    .controller('FlatUICtrl', ['$scope', function($scope) {
        $scope.checkbox1 = {};
        $scope.checkbox1.options = [
          {
            "name": "check1",
            "id": 1,
            "selected": true
          }, {
            "name": "check2",
            "id": 2,
            "selected": false
          }
        ];

        $scope.cbox = {
          selected: false,
          label: 'This is stupid'
        };

    }]);
})();