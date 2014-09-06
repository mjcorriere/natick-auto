// requires app.js to be loaded prior

app.controller('CanvasController', ['$scope', 'squares', function($scope, squares) {

	$scope.squares = squares.getSquares();

	$scope.mousedOver = function(square) {
		//squares.setSquareHovered(square, true);
		square.setHovered(true);
	}

	$scope.mousedOut = function(square) {
		//squares.setSquareHovered(square, false);
		square.setHovered(false);
	}

}]);
