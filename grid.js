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

		this.candidateMode = false;

		this.candidateIndices = [];
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
		return _.contains(this.flattened, 0)
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
		// TODO WFH We don't want to override answers unless we're invalidating.
		// Maybe break setting out into a private function, and only have this
		// exception thrown when we're not setting from the invalidate method?
		if (this.flattened[index] !== 0 && !this.candidateMode && value !== 0) {
			console.log(index, this.flattened[index]);

			console.log(this.flattened);

			throw 'Trying to override answer for a cell.';
		}

		if (this.candidateMode) {
			this.candidateIndices.push(index);
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

	Grid.prototype.useCandidates = function () {
		this.candidateMode = true;
	};

	Grid.prototype.invalidateCandidates = function () {
		_.each(this.candidateIndices, invalidateCandidate, this);

		function invalidateCandidate(candidateIndex) {
			this.set(candidateIndex, 0);
		}

		this.candidateIndices = [];

		this.candidateMode = false;
	};

	window.Grid = Grid;

})();
