package main

import "fmt"

type Person struct {
	Name string
	Year int
}

func (p *Person) AgeCalc() int {
	p.Year++ //increment only here
	return 2024 - p.Year
}

func main() {
	var name string
	var year int
	fmt.Print("Enter Name and Year of birth:")
	fmt.Scan(&name, &year)
	p1 := Person{name,year}
	age := p1.AgeCalc()
	fmt.Println("Age:",age)
	fmt.Println("Year:",p1.Year)
}