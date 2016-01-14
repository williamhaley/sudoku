(function () {

	// TODO WFH Really, the c'tor should accept the puzzle so it knows its own
	// dimensions. My puzzles are all 9x9, but still, it's bad design.
	function Board($node) {
		this.$node = $node;
	}

	function buildEmptyGameBoard(dimension) {
		var total = Math.pow(dimension, 2);

		var $row;

		// Might be more readable to have nested for loops for adding a row and
		// cells, but this is slightly more optimal and nested for loops are evil.
		for (var index = 0; index < total; index++) {
			if (index % dimension == 0) {
				$row = $('<tr>');

				this.$tbody.append($row);
			}

			var $cell = $('<td>')

			$row.append($cell);
		}

		this.$node.append()
	}

	Board.prototype.setupUI = function (puzzle) {
		this.$table = $('<table>');
		this.$tbody = this.$table.append('<tbody>');

		var dimension = 9;

		// This is a bit overkill, but I wanted to show a private function.
		_.bind(buildEmptyGameBoard, this)(dimension);

		// Some optimization can be gained by manipulating a node while it's
		// not appended to the DOM. So, append the table at the very end.
		this.$node.append(this.$table);
	};

	Board.prototype.setPuzzle = function (puzzle) {
		this.puzzle = puzzle;

		var flattened = _.flatten(puzzle);

		function populateCell(index, item) {
			var value = flattened[index];
			var given = value !== 0;

			// A ternary is more terse, but an if/else is a bit more readable.
			if (given) {
				$(item).addClass('given').text(value);
			} else {
				$(item).addClass('unknown');
			}
		}

		// Setting the values at the same time we build the board would be optimal,
		// but this is slightly more readable and it's a small scale app.
		this.$tbody.find('td').each(populateCell);
	};

	window.Board = Board;
})();
