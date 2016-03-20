public class Grid {

    private int[][] puzzle;
    private int[] flattened;
    private int[] answerIndeces;
    private static final int DIMENSION = 9;

    public Grid(int[][] puzzle) {
        this.puzzle = puzzle;

        // TODO WFH Better ways to define the DIMENSION and length?
        int length = this.DIMENSION * this.DIMENSION;

        this.answerIndeces = new int[length];
        this.flattened = new int[length];

        this.updateFlattened();
    }

    private void updateFlattened() {
        int index = 0;

        for (int row = 0; row < this.DIMENSION; row++) {

            for (int column = 0; column < this.DIMENSION; column++) {
                this.flattened[index] = this.puzzle[row][column];

                index++;
            }
        }
    }

    public void print() {
        System.out.println(this.toString());
    }

    public int getBoxNumberForIndex(int index) {
        index / 3

        0, 1, 2, 9, 10, 11, 18, 19, 20

        var row = Math.floor(flattenedIndex / this.dimension);

        // Get the *first* row for the square in which the flattenedIndex resides.
        row = row - (row % 3);

        // Get the column for the flattenedIndex.
        var col = flattenedIndex % this.dimension;

        // Get the *first* column for the square in which the flattenedIndex resides.
        col = col - (col % 3);

        return this.coordinatesToIndex(row, col);

        0, 3, 6
                27, 30, 33
                        54, 57, 60

        0, 1, 2
                9, 10, 11
                        18, 19, 20
    }

    public String toString() {
        String string = "";
        String value;

        int row = 0;
        int column;

        for (int index = 0; index < this.flattened.length; index++) {
            value = this.flattened[index] + "";

            column = index % 9;

            // TODO WFH Must be better way to figure this out...
            // TODO WFH Get "box" (what's the term?) number...
            if (row < 3 && column >=3 && column < 6) {
                value = Console.coloredBlue(value);
            } else {
                value = Console.coloredBlack(value);
            }

            string += value;

            if ((index + 1) % this.DIMENSION == 0) {
                string += "\n";

                row++;
            } else {
                string += " ";
            }
        }

        return string;
    }
}