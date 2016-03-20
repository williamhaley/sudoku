var Grid = require('../lib/Grid');

describe('Grid', function() {

	describe('#rowForIndex', function () {

		beforeEach(function () {
			var puzzle = [
				[3, 0, 9, 5, 4, 0, 8, 0, 6],
				[0, 7, 0, 8, 3, 0, 0, 0, 0],
				[5, 0, 2, 0, 0, 7, 3, 0, 0],
				[0, 0, 7, 0, 9, 0, 0, 0, 2],
				[9, 3, 0, 0, 0, 0, 0, 5, 7],
				[4, 0, 0, 0, 7, 0, 6, 0, 0],
				[0, 0, 3, 7, 0, 0, 5, 0, 4],
				[0, 0, 0, 0, 1, 9, 0, 2, 0],
				[7, 0, 1, 0, 5, 3, 9, 0, 8]
			];

			this.grid = new Grid(puzzle);
		});

		it('determines the appropriate row for a linear index', function () {
			var actual = this.grid.rowForIndex(30);

			expect(actual).deep.equal([0, 0, 7, 0, 9, 0, 0, 0, 2]);
		});

	});

});
