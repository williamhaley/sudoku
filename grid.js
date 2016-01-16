(function () {

	// TODO WFH Standardize on structure for puzzle. Better to store it as a 2D
	// array, flat array, something else? Use this class to manage structure and
	// grid lookup rather than having other functions convert the puzzle to different
	// formats when iterating and manipulating?

	var DIMENSION = 9;

	function Grid(puzzle) {
		// TODO WFH Make these private.
		this.puzzle = puzzle;

		this.flattened = _.flatten(puzzle);

		this.answerIndices = [];
	}

	Grid.prototype.toString = function () {
		var string = '';

		_.each(this.puzzle, print);

		function print(row) {
			string += row.join(' ') + '\n';
		}

		return string;
	};

	Grid.prototype.solved = function () {
		return !_.contains(this.flattened, 0)
	};

	Grid.prototype.rowForIndex = function (index) {
		var rowIndex = Math.floor(index / DIMENSION);

		return this.flattened[rowIndex];
	};

	Grid.prototype.colForIndex = function (index) {
		var base = index % DIMENSION;

		var offset = 0;

		return _.map(new Array(DIMENSION), function (colIndex) {
			colIndex = base + offset;

			offset += DIMENSION;

			return this.flattened[colIndex];
		}, this);
	};

	Grid.prototype.set = function (index, value) {
		if (this.flattened[index] !== 0 && value !== 0) {
			throw 'Trying to override an existing answer for a cell.';
		}

		if (value !== 0) {
			this.answerIndices.push(index);
		}

		this.flattened[index] = value;

		var rowIndex = Math.floor(index / DIMENSION);
		var colIndex = index % DIMENSION;

		this.puzzle[rowIndex][colIndex] = value;

		notifications.emit('answer-provided', {
			answer: value,
			index: index
		});
	};

	/*
	 * We tried a candidate, then determined the puzzle was unsolvable with that
	 * candidate. Invalidate the candidate and every answer set after it.
	*/
	// TODO WFH This belongs in solver, not here. Grid shouldn't need to know
	// about invalidating its own answers.
	Grid.prototype.invalidateAnswersAfter = function (afterIndex) {
		var index = _.indexOf(this.answerIndices, afterIndex);

		var indicesToReset = this.answerIndices.splice(index);

		_.each(indicesToReset, invalidateAnswer, this);

		function invalidateAnswer(answerIndex) {
			this.set(answerIndex, 0);
		}
	};

	window.Grid = Grid;

})();
