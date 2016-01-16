(function () {

	// TODO WFH Standardize on structure for puzzle. Better to store it as a 2D
	// array, flat array, something else? Use this class to manage structure and
	// grid lookup rather than having other functions convert the puzzle to different
	// formats when iterating and manipulating?

	var DIMENSION = 9;

	function Grid(puzzle) {
		this.puzzle = puzzle;

		this.flattened = _.flatten(puzzle);
	}

	Grid.prototype.toString = function () {
		_.each(this.puzzle, print);

		function print(row) {
			console.log(row.join(' '));
		}
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
		this.flattened[index] = value;

		var row = Math.floor(index / DIMENSION);
		var col = index % DIMENSION;

		this.puzzle[col][row] = value;
	};

	window.Grid = Grid;

})();
