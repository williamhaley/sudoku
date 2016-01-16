(function () {

	/*
	 * Return Array of possible answers at an index by following the rules
	 * of the game. Answer cannot already be in that row, column, or square.
	 */
	function possibleAnswers(grid, index) {
		var answers = _.range(1, 10);

		var row = grid.rowForIndex(index);
		var col = grid.colForIndex(index);

		answers = _.difference(answers, row);
		answers = _.difference(answers, col);

		var square = grid.squareForIndex(index);

		answers = _.difference(answers, square);

		return answers;
	}

	function solvePuzzle(puzzle, grid) {
		var flatSolution = _.clone(puzzle);

		var iterations = 0;
		var nothingChanged;

		while (!grid.solved() && iterations < 100 && !nothingChanged) {
			nothingChanged = true;

			function attemptToSolveCell(item, index) {
				if (item !== 0) {
					return;
				}

				var answers = possibleAnswers(grid, index);

				if (answers.length !== 1) {
					return;
				}

				var answer = answers[0];

				nothingChanged = false;

				flatSolution[index] = answer;

				grid.set(index, answer);
			}

			_.each(flatSolution, attemptToSolveCell);

			iterations++;
		}

		var solved = grid.solved();

		// nothing changed, no solutions, let's try something else...
		if (nothingChanged && !grid.solved()) {

			var firstUnknown = _.indexOf(flatSolution, 0);

			var candidateAnswersForCell = possibleAnswers(grid, firstUnknown);

			for (var index = 0; index < candidateAnswersForCell.length; index++) {
				var puzzleWithGuessedAnswer = _.clone(flatSolution);

				puzzleWithGuessedAnswer[firstUnknown] = candidateAnswersForCell[index];

				grid.set(firstUnknown, candidateAnswersForCell[index]);

				var complete = solvePuzzle(puzzleWithGuessedAnswer, grid);

				if (grid.solved()) {
					return complete;
				} else {
					grid.invalidateAnswersAfter(firstUnknown);
				}
			}
		}

		return flatSolution;
	}

	window.solvePuzzle = solvePuzzle;

})();
