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
		console.log(this.toString());

		console.log(this.flattened);

		return !_.contains(this.flattened, 0)
	};

	Grid.prototype.rowForIndex = function (index) {
		var base = index - (index % DIMENSION);

		var offset = 0;

		return _.map(new Array(DIMENSION), function (value) {
			value = base + offset;

			offset++;

			return puzzle[value];
		});
	};

	Grid.prototype.colForIndex = function (index) {
		var base = index % DIMENSION;

		var offset = 0;

		return _.map(new Array(DIMENSION), function (value) {
			value = base + offset;

			offset += DIMENSION;

			return puzzle[value];
		});
	}

	Grid.prototype.inRow = function (index, value) {
		var row = this.rowForIndex(index);

		return _.indexOf(row, value) > -1;
	};

	Grid.prototype.inCol = function (index, value) {
		var col = this.colForIndex(index);

		return _.indexOf(col, value) > -1;
	};

	Grid.prototype.set = function (index, value) {
		if (this.flattened[index] !== 0 && value !== 0) {
			throw 'Trying to override answer for a cell.';
		}

		if (value !== 0) {
			this.answerIndices.push(index);
		}

		this.flattened[index] = value;

		var row = Math.floor(index / DIMENSION);
		var col = index % DIMENSION;

		this.puzzle[row][col] = value;

		// TODO WFH Break out notifications into a global.
		$('body').trigger('answer-provided', {
			answer: value,
			index: index
		});
	};

	/*
	 * We tried a candidate, then determined the puzzle was unsolvable with that
	 * candidate. Invalidate the candidate and every answer set after it.
	*/
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
