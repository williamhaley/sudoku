(function () {

	function Board($node, grid) {
		this.$node = $node;

		this.grid = grid;

		notifications.on('answer-provided', _.bind(this.answerProvided, this));

		this.setupUI();
	}

	function populateBoard($board, cells) {
		var $row;

		// Might be more readable to have nested for loops for adding a row and
		// cells, but this is slightly more optimal and nested loops are evil.
		_.each(cells, populateCell, this);

		function populateCell(given, index) {
			if (index % this.grid.dimension === 0) {
				$row = $('<tr>');

				$board.append($row);
			}

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
		_.bind(populateBoard, this)(this.$tbody, this.grid.cells());

		this.$node.append(this.$table);
	};

	Board.prototype.answerProvided = function (event, data) {
		var $cells = this.$table.find('td');

		var $cell = $($cells[data.index]);

		$cell.text(data.answer);
	};

	window.Board = Board;
})();
