global.Grid   = require('./grid.js'   );
global.Solver = require('./solver.js' );

var puzzles   = require('../assets/puzzles.js');

global.randomPuzzle = function (difficulty) {
	var puzzlesByDifficulty = puzzles[difficulty];

	if (!puzzlesByDifficulty) {
		throw 'Invalid difficulty: ' + difficulty + '.';
	}

	var size = puzzlesByDifficulty.length;

	if (size === 0) {
		throw 'No puzzles for difficulty: ' + difficulty + '.';
	}

	var index = Math.floor(Math.random() * size);

	return puzzlesByDifficulty[index];
};
