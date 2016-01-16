(function () {

	// TODO WFH.
	var DIMENSION = 9;

	function Board($node, grid) {
		this.$node = $node;

		this.grid = grid;

		notifications.on('answer-provided', _.bind(this.answerProvided, this));

		this.setupUI();
	}

	function populateBoard($board, flattenedPuzzle, reducer) {
		var $row;

		// Might be more readable to have nested for loops for adding a row and
		// cells, but this is slightly more optimal and nested loops are evil.
		for (var index = 0; index < flattenedPuzzle.length; index++) {
			if (index % DIMENSION === 0) {
				$row = $('<tr>');

				$board.append($row);
			}

			// TODO WFH Create an accessor for Grid.
			var given = flattenedPuzzle[index];

			var $cell = $('<td>');

			// A ternary is more terse, but an if/else is a bit more readable.
			if (given !== 0) {
				$cell.addClass('given').text(given);
			} else {
				$cell.addClass('unknown');
			}

			$row.append($cell);
		}
	}

	Board.prototype.setupUI = function () {
		this.$table = $('<table>');
		this.$tbody = this.$table.append('<tbody>');

		// Purposefully manipulating the $table node *before* appending it to
		// the DOM as there are some performance benefits.
		populateBoard(this.$tbody, this.grid.flattened);

		this.$node.append(this.$table);
	};

	Board.prototype.answerProvided = function (event, data) {
		var $cells = this.$table.find('td');

		var $cell = $($cells[data.index]);

		$cell.text(data.answer);
	};

	window.Board = Board;
})();
