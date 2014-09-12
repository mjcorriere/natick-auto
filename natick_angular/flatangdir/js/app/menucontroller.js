// requires app.js, square.js to be loaded prior

app.controller('MenuController', ['$scope', 'squares', function($scope, squares) {

	$scope.squares = squares.getSquares();

	$scope.addSquare = function() {
		squares.addSquare();
	}

	$scope.deleteSquare = function(square) {
		squares.deleteSquare(square);
	}

	$scope.logIt = function() {
		console.log('hello');
	}

}]);

