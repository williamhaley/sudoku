#include <stdbool.h>

void get_possibles(int *taken, int size_taken, int *possibles)
{
    // Figure out then, which numbers are NOT taken in a given row
    int x = 0;
    for (int i = 1; i <= 9; i++)
    {
        bool found = false;
        for (int j = 0; j < size_taken; j++)
        {
            // printf("is %d in the taken array at %d, value of %d?\n", i, j, taken[j]);
            if (i == taken[j])
            {
                found = true;
            }
        }
        if (!found)
        {
            possibles[x] = i;
            x++;
        }
    }
}