#include <stdio.h>

#define KGRN "\x1B[32m"
#define RESET "\x1B[0m"

void print_arr(int *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void print_game_turn(int game[9][9], int active_row, int active_column)
{
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (i == active_row && j == active_column)
            {
                printf(KGRN "%d" RESET, game[i][j]);
            }
            else
            {
                printf("%d", game[i][j]);
            }
            if (j + 1 != 9 && (j + 1) % 3 == 0)
            {
                printf(" |");
            }
            if (j + 1 != 9)
            {
                printf(" ");
            }
        }
        printf("\n");

        if (i + 1 != 9 && (i + 1) % 3 == 0)
        {
            for (int x = 0; x < 19; x++)
            {
                printf("-");
                if (x == 5 || x == 12)
                {
                    printf("+");
                }
            }
            printf("\n");
        }
    }
}

void print_game(int game[9][9])
{
    print_game_turn(game, -1, -1);
}