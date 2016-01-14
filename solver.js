var functions = {};

$(document).ready(init);

function init() {

	function walkSquare(puzzle, index, callback) {
		var square = [];
		var index = getFirstIndexInSquare(index);
		var indexes = [];

		while (square.length < 9) {
			var value = puzzle[index];

			if (callback) {
				callback(value, index);
			}

			index++;

			if (index % 3 == 0) {
				index += 6;
			}

			square.push(value)
		}
	}

	function inRow(puzzle, index, value) {
		var row = getRowForIndex(puzzle, index);

		return _.indexOf(row, value) > -1;
	}

	function inCol(puzzle, index, value) {
		var col = getColForIndex(puzzle, index);

		return _.indexOf(col, value) > -1;
	}

	function getColForIndex(puzzle, index) {
		var base = index % 9;

		var offset = 0;

		return _.map(new Array(9), function (value) {
			value = base + offset;
			offset += 9;
			return puzzle[value];
		});
	}

	function getRowForIndex(puzzle, index) {
		var base = index - (index % 9);
		var offset = 0;

		return _.map(new Array(9), function (value) {
			value = base + offset;
			offset++;
			return puzzle[value];
		});
	}

	function getFirstIndexInSquare (index) {
		var row = Math.floor(index / 9);
		row = row - (row % 3)

		var col = index % 9;
		col = col - (col % 3);

		// return index - (index % 9) - (Math.floor(index / 9) % 3) * 9;
		return row * 9 + col;
	}

	function coordinateToIndex(col, row) {
		return row * 9 + col;
	}

	function indexToCoordinates(index) {
		var row = Math.floor(index / 9);
		var col = index % 9;

		return {
			row: row,
			col: col
		};
	}

	function squareForIndex(flatSolution, flattendIndex) {
		var square = [];

		walkSquare(flatSolution, flattendIndex, pushValueAtIndex);

		function pushValueAtIndex(value, index) {
			square.push(value);
		}

		return square;
	}

	function puzzleNotSolved(flatSolution) {
		return _.contains(flatSolution, 0)
	}

	function puzzleSolved(flatSolution) {
		return !puzzleNotSolved(flatSolution);
	}

	function solvePuzzle(puzzle) {
		var flatSolution = _.clone(puzzle);

		/*
		 * Return Array of possible answers at an index by following the rules
		 * of the game. Answer cannot already be in that row, column, or square.
		 */
		function possibleAnswers(index, row, col) {
			var answers = _.range(1,10);

			var row = getRowForIndex(flatSolution, index);
			var col = getColForIndex(flatSolution, index);

			answers = _.difference(answers, row);
			answers = _.difference(answers, col);

			var square = squareForIndex(flatSolution, index);

			answers = _.difference(answers, square);

			return answers;
		}

		function solve(index, answer) {
			flatSolution[index] = answer;
		}

		function violatesGameRules (answer, index) {
			var isInRow = inRow(flatSolution, index, answer);

			var isInCol = inCol(flatSolution, index, answer);

			var square = squareForIndex(flatSolution, index);

			var inSquare = _.indexOf(square, answer) > -1;

			return isInRow || isInCol || inSquare;
		}

		var iterations = 0;
		var nothingChanged;
		while (puzzleNotSolved(flatSolution) && iterations < 100 && !nothingChanged) {
			nothingChanged = true;

			function attemptToSolveCell(item, index) {
				if (item !== 0) {
					return;
				}

				var answers = possibleAnswers(index);

				if (answers.length !== 1) {
					return;
				}

				var answer = answers[0];

				nothingChanged = false;

				solve(index, answer);
			}

			_.each(flatSolution, attemptToSolveCell);

			iterations++;
		}

		var solved = puzzleSolved(flatSolution);

		// nothing changed, no solutions, let's try something else...
		if (nothingChanged && puzzleNotSolved(flatSolution)) {

			var firstUnknown = _.indexOf(flatSolution, 0);

			var answers = possibleAnswers(firstUnknown);

			for (var index = 0; index < answers.length; index++) {
				var puzzleWithGuessedAnswer = _.clone(flatSolution);

				puzzleWithGuessedAnswer[firstUnknown] = answers[index];

				var complete = solvePuzzle(puzzleWithGuessedAnswer);

				if (puzzleSolved(complete)) {
					return complete;
				}
			}
		}

		return flatSolution;
	}

	var start = new Date();

	// var complete = solvePuzzle(_.flatten(puzzle));

	var finished = new Date();

	console.log(start);
	console.log(finished);
	console.log(finished - start);
	// console.log('Puzzle' + (puzzleNotSolved(_.flatten(complete)) ? ' NOT' : '') + ' solved');

	// printPuzzle(complete);

	function printPuzzle (puzzle) {
		function updateCell(item, index) {
			if (item === 0) {
				return;
			}
			$($('td').get(index)).text(item);
		}

		// print answers
		_.each(_.flatten(puzzle), updateCell);
	}
}
