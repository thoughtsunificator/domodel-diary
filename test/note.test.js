import assert from "assert"
import { Observable } from "domodel"

import Note from "../src/object/note.js"

describe("note", () => {

	it("instance", () => {

		const date = new Date()
		const note = new Note("hello", date)
		assert.strictEqual("hello", note.content)
		assert.strictEqual(date, note.date)
		assert.ok(note instanceof Observable)
		assert.doesNotThrow(() => {
			note.content = "cxzcxz"
		})
		assert.throws(() => {
			note.date = ""
		})

	})

})
