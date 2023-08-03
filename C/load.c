#include <stdio.h>

void populate(int game[9][9])
{
    FILE *fptr;
    fptr = fopen("../boards.txt", "r");
    char board[82];
    fgets(board, 82, fptr);
    fclose(fptr);

    int index = 0;

    for (int row = 0; row < 9; row++)
    {
        for (int column = 0; column < 9; column++)
        {
            game[row][column] = board[index] - '0';
            index++;
        }
    }
}
