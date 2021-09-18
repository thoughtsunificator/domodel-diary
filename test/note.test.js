import { Observable } from "domodel"

import Note from "../src/object/note.js"

export function instance(test) {
	test.expect(5)
	const date = new Date()
	const note = new Note("hello", date)
	test.strictEqual("hello", note.content)
	test.strictEqual(date, note.date)
	test.ok(note instanceof Observable)
	test.doesNotThrow(() => {
		note.content = "cxzcxz"
	})
	test.throws(() => {
		note.date = ""
	})
	test.done()
}
