package main

import (
	"bufio"
	"fmt"
	"os"
	"sudoku/set"
)

const GREEN = "\x1B[32m"
const RESET = "\x1B[0m"

type Game struct {
	board [9][9]int
}

func (g *Game) Populate() {
	file, _ := os.Open(os.Getenv("BOARDS_FILE_PATH"))
	scanner := bufio.NewScanner(file)
	if !scanner.Scan() {
		panic("No boards in file")
	}

	board := scanner.Text()

	for i, c := range []rune(board) {
		g.board[i/9][i%9] = int(c - '0')
	}
}

func (g *Game) Print() {
	for i := 0; i < 9; i++ {
		for j := 0; j < 9; j++ {
			fmt.Print(g.board[i][j])
			if j+1 != 9 && (j+1)%3 == 0 {
				fmt.Print(" |")
			}
			if j+1 != 9 {
				fmt.Print(" ")
			}
		}
		fmt.Println()
		if i+1 != 9 && (i+1)%3 == 0 {
			for x := 0; x < 19; x++ {
				fmt.Print("-")
				if x == 5 || x == 12 {
					fmt.Print("+")
				}
			}
			fmt.Print("\n")
		}
	}
}

func (g *Game) PrintTurn(row int, column int) {
	for i := 0; i < 9; i++ {
		for j := 0; j < 9; j++ {
			if i == row && j == column {
				fmt.Printf(GREEN+"%d"+RESET, g.board[i][j])
			} else {
				fmt.Print(g.board[i][j])
			}
			if j+1 != 9 && (j+1)%3 == 0 {
				fmt.Print(" |")
			}
			if j+1 != 9 {
				fmt.Print(" ")
			}
		}
		fmt.Println()
		if i+1 != 9 && (i+1)%3 == 0 {
			for x := 0; x < 19; x++ {
				fmt.Print("-")
				if x == 5 || x == 12 {
					fmt.Print("+")
				}
			}
			fmt.Print("\n")
		}
	}
}

func (g *Game) rowPossibles(row int) *set.Set {
	s := set.New(1, 2, 3, 4, 5, 6, 7, 8, 9)

	for i := 0; i < 9; i++ {
		s.Remove(g.board[row][i])
	}

	return s
}

func (g *Game) columnPossibles(column int) *set.Set {
	s := set.New(1, 2, 3, 4, 5, 6, 7, 8, 9)

	for i := 0; i < 9; i++ {
		s.Remove(g.board[i][column])
	}

	return s
}

func (g *Game) boxPossibles(row int, column int) *set.Set {
	s := set.New(1, 2, 3, 4, 5, 6, 7, 8, 9)

	boxRowStart := row - (row % 3)
	boxColumnStart := column - (column % 3)

	// Figure out which numbers are already taken in a given box
	for i := 0 + boxRowStart; i < 3+boxRowStart; i++ {
		for j := 0 + boxColumnStart; j < 3+boxColumnStart; j++ {
			s.Remove(g.board[i][j])
		}
	}

	return s
}

func (g *Game) Solve() {
	for solved := false; !solved; {
		for row := 0; row < 9; row++ {
			for column := 0; column < 9; column++ {
				if g.board[row][column] != 0 {
					continue
				}

				possiblesRow := g.rowPossibles(row)
				fmt.Printf("possibles (row):\t%v\n", possiblesRow.Slice())
				possiblesColumn := g.columnPossibles(column)
				fmt.Printf("possibles (column):\t%v\n", possiblesColumn.Slice())
				possiblesBox := g.boxPossibles(row, column)
				fmt.Printf("possibles (box):\t%v\n", possiblesBox.Slice())
				overlapSlice := set.Intersection(possiblesRow, possiblesColumn, possiblesBox).Slice()
				fmt.Printf("possibles (all):\t%v\n", overlapSlice)

				if len(overlapSlice) == 1 {
					g.board[row][column] = overlapSlice[0]
				}

				g.PrintTurn(row, column)

				fmt.Println("Press the Enter Key to continue")
				fmt.Scanln()
			}
		}
	}
}

func main() {
	g := &Game{}
	g.Populate()
	g.Solve()
}
