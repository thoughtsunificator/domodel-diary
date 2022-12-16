import test from "ava"
import { Observable } from "domodel"

import Note from "../src/object/note.js"
import Notes from "../src/object/notes.js"


test("Notes instance", (test) => {
	const notes = new Notes()
	const date = new Date()
	test.true(Notes.prototype instanceof Observable)
	test.throws(() => { notes.notesList = "" })
})

test("Notes toString", (test) => {
	const notes = new Notes()
	const date = new Date()
	const date_ = new Date()
	notes.notesList.push(new Note("cxzcxz", date))
	notes.notesList.push(new Note("tesfdsfd", date_))
	test.deepEqual(JSON.parse(notes.toString()), [
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

test("Notes add", (test) => {
	const notes = new Notes()
	const date = new Date()
	const date_ = new Date()
	notes.add("dsads", date)
	test.is(notes.notesList.length, 1)
	notes.add("cxzcxgd", date_)
	test.is(notes.notesList.length, 2)
	test.is(notes.notesList[0].content, "dsads")
	test.is(notes.notesList[0].date, date)
	test.is(notes.notesList[1].content, "cxzcxgd")
	test.is(notes.notesList[1].date, date_)
})

test("Notes remove", (test) => {
	const notes = new Notes()
	const note = new Note("cxzcxz", new Date())
	notes.notesList.push(note)
	test.is(notes.notesList.length, 1)
	notes.remove(note)
	test.is(notes.notesList.length, 0)
})

test("Notes update", (test) => {
	const notes = new Notes()
	const note = new Note("cxzcxz", new Date())
	notes.notesList.push(note)
	test.is(notes.notesList[0].content, "cxzcxz")
	notes.update(note, { content: "test" })
	test.is(notes.notesList[0].content, "test")
})

test("Notes byDate", (test) => {
	const notes = new Notes()
	const date = new Date("1995-12-17T03:24:10")
	const date_ = new Date("1995-12-17T03:24:00")
	const date__ = new Date("1995-12-11")
	const note = new Note("cxzcxz", date)
	const note_ = new Note("vcxgfd", date_)
	const note__ = new Note("rewr", date__)
	notes.notesList.push(note, note_, note__)
	test.deepEqual(notes.byDate(date), [note, note_])
	test.deepEqual(notes.byDate(date__), [note__])
	test.deepEqual(notes.byDate(date__), [note__])
})

test("Notes clear", (test) => {
	const notes = new Notes()
	notes.notesList.push(new Note("cxzcxz", new Date()))
	test.is(notes.notesList.length, 1)
	notes.clear()
	test.is(notes.notesList.length, 0)
})

