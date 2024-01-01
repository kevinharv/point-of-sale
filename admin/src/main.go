package main

import (
	"fmt"
	"net/http"
	"pos/src/components"
	"github.com/a-h/templ"
)

func main() {
	component := components.Hello("Frankford")

	http.Handle("/", templ.Handler(component))

	fmt.Println("Listening on http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
