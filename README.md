# Sudoku

Experimenting with automated puzzle solvers and patterns in Sudoku.

# Setup

Install [nvm](https://github.com/creationix/nvm/blob/master/README.markdown).

	nvm use

# Build

	npm run build-js

# Run

	Open `public/sudoku.html` in a browser.

# Test

	npm test

# TODOs

1. I should add front end-specs for Board.js.
1. puzzle.js should be broken out.
  1. randomPuzzle() can be a function in app.js.
  1. puzzles.js can be in `assets`.
1. Nothing  in `/lib` needs to be server-side, I'm just writing them in that typical node webapp way so it's easier to test them, and using browserify to generate the client-side JS. Would it be better to write them all client-side and test them as client-side code, or better to keep them more generic, not tied to the UI, and treat the client-side generation as the "extra" step here? I'm leaning towards the latter. Better as "server-side".
