// TODO WFH Standardize on structure for puzzle. Better to store it as a 2D
// array, flat array, something else? Use this class to manage structure and
// grid lookup rather than having other functions convert the puzzle to different
// formats when iterating and manipulating?

var _ = require('underscore');

function Grid(puzzle) {
	this.puzzle = puzzle;

	this.flattened = _.flatten(puzzle);

	this.answerIndices = [];

	// TODO WFH Throw exception if not a perfect square? How do other sudoku
	// puzzles work when not 9x9? Like, if 2x2, are the numbers allowed only
	// 1 and 2? More than that, can my solver work for those non-9x9 puzzles?
	this.dimension = Math.sqrt(this.flattened.length);
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
	var rowIndex = Math.floor(index / this.dimension);

	return this.puzzle[rowIndex];
};

Grid.prototype.colForIndex = function (index) {
	var base = index % this.dimension;

	var offset = 0;

	return _.map(new Array(this.dimension), function (colIndex) {
		colIndex = base + offset;

		offset += this.dimension;

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

	var rowIndex = Math.floor(index / this.dimension);
	var colIndex = index % this.dimension;

	this.puzzle[rowIndex][colIndex] = value;

	notifications.emit('answer-provided', {
		answer: value,
		index: index
	});
};

Grid.prototype.squareForIndex = function (flattendIndex) {
	var square = [];
	var index = this.getFirstIndexForSquare(flattendIndex);
	var indexes = [];

	while (square.length < this.dimension) {
		var value = this.flattened[index];

		index++;

		if (index % 3 == 0) {
			index += 6;
		}

		square.push(value);
	}

	return square;
};

/*
 * Return the flattened index of the first item in a 3x3 square.
 * TODO WFH I need to determine if this sort of work is worth it or if it
 * would be easier to navigate the 2D array.
 */
Grid.prototype.getFirstIndexForSquare = function (flattenedIndex) {
	// Get the row for the flattenedIndex.
	var row = Math.floor(flattenedIndex / this.dimension);

	// Get the *first* row for the square in which the flattenedIndex resides.
	row = row - (row % 3);

	// Get the column for the flattenedIndex.
	var col = flattenedIndex % this.dimension;

	// Get the *first* column for the square in which the flattenedIndex resides.
	col = col - (col % 3);

	return this.coordinatesToIndex(row, col);
};

Grid.prototype.coordinatesToIndex = function (row, column) {
	return row * this.dimension + column;
};

Grid.prototype.cells = function () {
	return this.flattened;
};


module.exports = Grid;
