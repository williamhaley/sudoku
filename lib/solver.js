var _ = require('underscore');

function Solver(grid) {
	this.grid = grid;

	this.attemptedIndices = [];
}

/*
 * Return Array of possible answers at an index by following the rules
 * of the game. Answer cannot already be in that row, column, or square.
 */
Solver.prototype.availableCandidates = function (index) {
	var candidates = _.range(1, 10);

	var row = this.grid.rowForIndex(index);
	var col = this.grid.colForIndex(index);

	candidates = _.difference(candidates, row);
	candidates = _.difference(candidates, col);

	var square = this.grid.squareForIndex(index);

	candidates = _.difference(candidates, square);

	return candidates;
};

Solver.prototype.solveByProcessOfElimination = function () {
	while (!this.grid.solved()) {
		var nothingChangedDuringIteration = true;

		// Iterate over every cell and attempt to solve by process of elimination.
		_.each(this.grid.cells(), attemptToSolveCell, this);

		function attemptToSolveCell(cell, index) {
			// Cell is already solved.
			if (cell !== 0) {
				return;
			}

			var candidates = this.availableCandidates(index);

			// Multiple candidates. No clear solution.
			if (candidates.length !== 1) {
				return;
			}

			var candidate = candidates[0];

			nothingChangedDuringIteration = false;

			this.useCandidate(candidate, index);
		}

		// We iterated over every cell and found no new solutions. Stop using this method.
		if (nothingChangedDuringIteration) {
			return;
		}
	}
};

Solver.prototype.solveByBruteForce = function () {
	var indexOfUnknownCell = _.indexOf(this.grid.cells(), 0);

	var candidateAnswersForCell = this.availableCandidates(indexOfUnknownCell);

	var that = this;

	// TODO WFH _.each.
	for (var index = 0; index < candidateAnswersForCell.length; index++) {
		var candidate = candidateAnswersForCell[index];

		that.useCandidate(candidate, indexOfUnknownCell);

		that.solve();

		if (that.grid.solved()) {
			return;
		}

		// Our candidate failed, because the puzzle is not solved. Invalidate
		// our candidate and any subsequent answer we set after it.
		that.invalidateAnswersAfter(indexOfUnknownCell);
	}
};

Solver.prototype.solve = function () {
	this.solveByProcessOfElimination();

	if (this.grid.solved()) {
		return;
	}

	this.solveByBruteForce();
};

Solver.prototype.useCandidate = function (candidate, index) {
	this.grid.set(index, candidate);

	this.attemptedIndices.push(index);
};

/*
 * We tried a candidate, then determined the puzzle was unsolvable with that
 * candidate. Invalidate the candidate and every answer set after it.
 */
Solver.prototype.invalidateAnswersAfter = function (afterIndex) {
	var index = _.indexOf(this.attemptedIndices, afterIndex);

	var indicesToReset = this.attemptedIndices.splice(index);

	_.each(indicesToReset, invalidateAnswer, this);

	function invalidateAnswer(answerIndex) {
		this.grid.set(answerIndex, 0);
	}
};

module.exports = Solver;
