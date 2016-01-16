(function () {

	// TODO WFH Really, the c'tor should accept the puzzle so it knows its own
	// dimensions. My puzzles are all 9x9, but still, it's bad design.
	function Board($node) {
		this.$node = $node;

		notifications.on('answer-provided', _.bind(this.answerProvided, this));
	}

	function buildEmptyGameBoard(dimension) {
		var total = Math.pow(dimension, 2);

		var $row;

		// Might be more readable to have nested for loops for adding a row and
		// cells, but this is slightly more optimal and nested loops are evil.
		for (var index = 0; index < total; index++) {
			if (index % dimension === 0) {
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

		// Purposefully manipulating the $table node *before* appending it to
		// the DOM as there are some performance benefits.
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

	// TODO WFH Shouldn't need to pass the puzzle here or above. Should pass grid
	// to Ctor and use that reference.

	Board.prototype.refreshAnswers = function (puzzle) {
		// return; // TODO WFH Not needed if we're live updating.

		var $cells = this.$table.find('td');

		_.each(_.flatten(puzzle), updateCell);

		function updateCell(item, index) {
			if (item === 0) {
				return;
			}

			var $cell = $($cells[index]);

			$cell.text(item);
		}
	};

	Board.prototype.answerProvided = function (event, data) {
		var $cells = this.$table.find('td');

		var $cell = $($cells[data.index]);

		$cell.text(data.answer);
	};

	window.Board = Board;
})();
