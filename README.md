# Sudoku

Experimenting with automated puzzle solvers and patterns in Sudoku.

# Setup

Install [nvm](https://github.com/creationix/nvm/blob/master/README.markdown).

	nvm use

# Build

	./node_modules/.bin/browserify lib/grid.js -o public/js/bundle.js

# Run

	Open `public/sudoku.html` in a browser.

# Test

	node test
