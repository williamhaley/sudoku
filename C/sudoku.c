#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#include "load.h"
#include "solve.h"
#include "tui.h"

const int SIZE = 9;

void possibles_row(int possibles[9], int *size, int game[SIZE][SIZE], int row)
{
    int size_taken = 0;
    int taken[SIZE];

    // Figure out which numbers are already taken in a given row
    for (int i = 0; i < SIZE; i++)
    {
        if (game[row][i] != 0)
        {
            taken[size_taken] = game[row][i];
            size_taken++;
        }
    }

    *size = SIZE - size_taken;
    get_possibles(taken, size_taken, possibles);
}

void possibles_column(int possibles[9], int *size, int game[SIZE][SIZE], int column)
{
    int size_taken = 0;
    int taken[SIZE];

    // Figure out which numbers are already taken in a given column
    for (int i = 0; i < SIZE; i++)
    {
        if (game[i][column] != 0)
        {
            taken[size_taken] = game[i][column];
            size_taken++;
        }
    }

    *size = SIZE - size_taken;
    get_possibles(taken, size_taken, possibles);
}

void possibles_box(int possibles[9], int *size, int game[SIZE][SIZE], int row, int column)
{
    int size_taken = 0;
    int taken[SIZE];

    int box_row_start = row - (row % 3);
    int box_column_start = column - (column % 3);

    // Figure out which numbers are already taken in a given box
    for (int i = 0 + box_row_start; i < 3 + box_row_start; i++)
    {
        for (int j = 0 + box_column_start; j < 3 + box_column_start; j++)
        {
            if (game[i][j] != 0)
            {
                taken[size_taken] = game[i][j];
                size_taken++;
            }
        }
    }

    *size = SIZE - size_taken;
    get_possibles(taken, size_taken, possibles);
}

void arr_intersection(int *overlap, int *overlap_size, int *a, int a_size, int *b, int b_size, int *c, int c_size)
{
    int size = 0;

    for (int i = 0; i < a_size; i++)
    {
        for (int j = 0; j < b_size; j++)
        {
            for (int k = 0; k < c_size; k++)
            {
                if (a[i] == b[j] && b[j] == c[k])
                {
                    overlap[size] = a[i];
                    size++;
                    break;
                }
            }
        }
    }

    *overlap_size = size;
}

void solve(int game[SIZE][SIZE])
{
    bool solved = false;

    while (!solved)
    {
        for (int row = 0; row < SIZE; row++)
        {
            for (int column = 0; column < SIZE; column++)
            {
                if (game[row][column] != 0)
                {
                    continue;
                }

                int row_possibles[9];
                int row_possibles_size = 0;
                possibles_row(row_possibles, &row_possibles_size, game, row);
                printf("possibles (row):\t");
                print_arr(row_possibles, row_possibles_size);

                int column_possibles[9];
                int column_possibles_size = 0;
                possibles_column(column_possibles, &column_possibles_size, game, column);
                printf("possibles (column):\t");
                print_arr(column_possibles, column_possibles_size);

                int box_possibles[9];
                int box_possibles_size = 0;
                possibles_box(box_possibles, &box_possibles_size, game, row, column);
                printf("possibles (box):\t");
                print_arr(box_possibles, box_possibles_size);

                int overlap[9];
                int overlap_size = 0;
                arr_intersection(overlap, &overlap_size, row_possibles, row_possibles_size, column_possibles, column_possibles_size, box_possibles, box_possibles_size);
                printf("possibles (all):\t");
                print_arr(overlap, overlap_size);

                if (overlap_size == 1)
                {
                    game[row][column] = overlap[0];
                }

                print_game_turn(game, row, column);

                printf("Press Any Key to Continue\n");
                getchar();
            }
        }
    }
}

int main()
{
    int game[SIZE][SIZE];
    int i, j;

    populate(game);
    solve(game);

    return 0;
}
