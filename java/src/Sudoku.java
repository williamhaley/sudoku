public class Sudoku {

    public static void main(String[] args) {
        int[][] puzzle = Puzzle.getPuzzle();

        Grid grid = new Grid(puzzle);

        grid.print();
    }
}