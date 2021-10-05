import assert from "assert"
import { Observable } from "domodel"

import Note from "../src/object/note.js"
import Notes from "../src/object/notes.js"

describe("notes", () => {

	it("instance", () => {
		const notes = new Notes()
		const date = new Date()
		assert.ok(Notes.prototype instanceof Observable)
		assert.throws(() => { notes.notesList = "" })
	})

	it("toString", () => {
		const notes = new Notes()
		const date = new Date()
		const date_ = new Date()
		notes.notesList.push(new Note("cxzcxz", date))
		notes.notesList.push(new Note("tesfdsfd", date_))
		assert.deepEqual(JSON.parse(notes.toString()), [
			{
				content: "cxzcxz",
				date: date.toISOString()
			},
			{
				content: "tesfdsfd",
				date: date_.toISOString()
			}
		])

	})

	it("add", () => {
		const notes = new Notes()
		const date = new Date()
		const date_ = new Date()
		notes.add("dsads", date)
		assert.strictEqual(notes.notesList.length, 1)
		notes.add("cxzcxgd", date_)
		assert.strictEqual(notes.notesList.length, 2)
		assert.strictEqual(notes.notesList[0].content, "dsads")
		assert.strictEqual(notes.notesList[0].date, date)
		assert.strictEqual(notes.notesList[1].content, "cxzcxgd")
		assert.strictEqual(notes.notesList[1].date, date_)
	})

	it("remove", () => {
		const notes = new Notes()
		const note = new Note("cxzcxz", new Date())
		notes.notesList.push(note)
		assert.strictEqual(notes.notesList.length, 1)
		notes.remove(note)
		assert.strictEqual(notes.notesList.length, 0)
	})

	it("update", () => {
		const notes = new Notes()
		const note = new Note("cxzcxz", new Date())
		notes.notesList.push(note)
		assert.strictEqual(notes.notesList[0].content, "cxzcxz")
		notes.update(note, { content: "test" })
		assert.strictEqual(notes.notesList[0].content, "test")
	})

	it("byDate", () => {
		const notes = new Notes()
		const date = new Date("1995-12-17T03:24:10")
		const date_ = new Date("1995-12-17T03:24:00")
		const date__ = new Date("1995-12-11")
		const note = new Note("cxzcxz", date)
		const note_ = new Note("vcxgfd", date_)
		const note__ = new Note("rewr", date__)
		notes.notesList.push(note, note_, note__)
		assert.deepEqual(notes.byDate(date), [note, note_])
		assert.deepEqual(notes.byDate(date__), [note__])
		assert.deepEqual(notes.byDate(date__), [note__])
	})

	it("clear", () => {
		const notes = new Notes()
		notes.notesList.push(new Note("cxzcxz", new Date()))
		assert.strictEqual(notes.notesList.length, 1)
		notes.clear()
		assert.strictEqual(notes.notesList.length, 0)
	})

})
