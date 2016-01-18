(function () {

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

	Solver.prototype.solve = function () {
		var iterations = 0;
		var nothingChanged;

		while (!this.grid.solved() && iterations < 100 && !nothingChanged) {
			nothingChanged = true;

			function attemptToSolveCell(item, index) {
				if (item !== 0) {
					return;
				}

				var candidates = this.availableCandidates(index);

				if (candidates.length !== 1) {
					return;
				}

				var candidate = candidates[0];

				nothingChanged = false;

				this.useCandidate(candidate, index);
			}

			_.each(this.grid.flattened, attemptToSolveCell, this);

			iterations++;
		}

		var solved = this.grid.solved();

		// nothing changed, no solutions, let's try something else...
		if (nothingChanged && !this.grid.solved()) {

			var firstUnknown = _.indexOf(this.grid.flattened, 0);

			var candidateAnswersForCell = this.availableCandidates(firstUnknown);

			for (var index = 0; index < candidateAnswersForCell.length; index++) {
				this.useCandidate(candidateAnswersForCell[index], firstUnknown);

				this.solve();

				if (this.grid.solved()) {
					return;
				} else {
					this.invalidateAnswersAfter(firstUnknown);
				}
			}
		}
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

	window.Solver = Solver;

})();
