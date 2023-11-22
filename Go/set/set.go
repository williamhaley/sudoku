package set

type Set struct {
	elements map[int]bool
}

func New(values ...int) *Set {
	s := &Set{
		elements: make(map[int]bool),
	}

	for _, value := range values {
		s.elements[value] = true
	}

	return s
}

func (s *Set) Add(value int) {
	s.elements[value] = true
}

func (s *Set) Remove(value int) {
	delete(s.elements, value)
}

func (s *Set) Slice() []int {
	var slice []int

	for value := range s.elements {
		slice = append(slice, value)
	}

	return slice
}

func Intersection(firstSet *Set, otherSets ...*Set) *Set {
	intersection := New()

	for value := range firstSet.elements {
		valid := true
		for _, set := range otherSets {
			if !set.elements[value] {
				valid = false
				break
			}
		}
		if valid {
			intersection.Add(value)
		}
	}

	return intersection
}
