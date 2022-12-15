import test from "ava"
import { Observable } from "domodel"

import Note from "../src/object/note.js"

test("Note instance", (test) => {
	const date = new Date()
	const note = new Note("hello", date)
	test.is("hello", note.content)
	test.is(date, note.date)
	test.true(Note.prototype instanceof Observable)
	test.notThrows(() => {
		note.content = "cxzcxz"
	})
	test.throws(() => {
		note.date = ""
	})
})

