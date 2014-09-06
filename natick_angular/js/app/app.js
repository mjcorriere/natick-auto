'use strict'

var app = angular.module('squareApp', []);

app.factory('squares', function() {

	var squares = [];
	var squaresService = {};

	squaresService.addSquare = function() {
		squares.push(new Square());
	}

	squaresService.deleteSquare = function(square) {

		// This should be a binary search instead of
		// sequential for speed. 
		for(var i = 0; i < squares.length; i++) {
			if (square.id == squares[i].id) {
				squares.splice(i, 1);
			}
		}
	}

	squaresService.setSquareHovered = function(square, hoverState) {
		for(var i = 0; i < squares.length; i++) {
			if (square.id == squares[i].id) {
				console.log('hoverstate: ' + hoverState);
				squares[i].hovered = hoverState;
				console.log(squares[i]);
				window.square = squares[i];
				console.log(squares[i].hovered);
			}
		}		
	}

	squaresService.getSquares = function() {
		return squares;
	}

	return squaresService;

});