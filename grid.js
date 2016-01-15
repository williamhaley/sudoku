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
	}

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
  }

  Grid.prototype.colForIndex(index) {
    var base = index % DIMENSION;

    var offset = 0;

    return _.map(new Array(DIMENSION), function (value) {
      value = base + offset;

      offset += DIMENSION;

      return puzzle[value];
    });
  }

  window.Grid = Grid;

})();
