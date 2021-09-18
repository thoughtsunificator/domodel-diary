import { Observable } from "domodel"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"
import Calendar from "../src/object/calendar.js"

export function instance(test) {
	test.expect(9)
	const date = new Date()
	const diary = new Diary(date)
	test.ok(diary instanceof Observable)
	test.ok(diary.calendar instanceof Calendar)
	test.strictEqual(diary.calendar.date, date)
	test.strictEqual(diary.firstRun, true)
	test.strictEqual(diary.password, null)
	test.ok(Array.isArray(diary.notes))
	test.strictEqual(diary.notes.length, 0)
	test.doesNotThrow(() => {
		diary.calendar = ""
		diary.firstRun = ""
		diary.password = ""
	})
	test.throws(() => {
		diary.notes = []
	})
	test.done()
}

export function toString(test) {
	test.expect(1)
	const diary = new Diary()
	const date = new Date()
	const date_ = new Date()
	diary.notes.push(new Note("cxzcxz", date))
	diary.notes.push(new Note("tesfdsfd", date_))
	test.deepEqual(JSON.parse(diary.toString()), [
		{
			content: "cxzcxz",
			date: date.toISOString()
		},
		{
			content: "tesfdsfd",
			date: date_.toISOString()
		}
	])
	test.done()
}

export function addNote(test) {
	test.expect(6)
	const diary = new Diary()
	diary.password = "Hello"
	const date = new Date()
	const date_ = new Date()
	diary.addNote("dsads", date)
	test.strictEqual(diary.notes.length, 1)
	diary.addNote("cxzcxgd", date_)
	test.strictEqual(diary.notes.length, 2)
	test.strictEqual(diary.notes[0].content, "dsads")
	test.strictEqual(diary.notes[0].date, date)
	test.strictEqual(diary.notes[1].content, "cxzcxgd")
	test.strictEqual(diary.notes[1].date, date_)
	test.done()
}

export function removeNote(test) {
	test.expect(2)
	const diary = new Diary()
	const note = new Note("cxzcxz", new Date())
	diary.notes.push(note)
	test.strictEqual(diary.notes.length, 1)
	diary.removeNote(note)
	test.strictEqual(diary.notes.length, 0)
	test.done()
}

export function updateNote(test) {
	test.expect(2)
	const diary = new Diary()
	const note = new Note("cxzcxz", new Date())
	diary.notes.push(note)
	test.strictEqual(diary.notes[0].content, "cxzcxz")
	diary.updateNote(note, { content: "test" })
	test.strictEqual(diary.notes[0].content, "test")
	test.done()
}

export function getNotesByDate(test) {
	test.expect(3)
	const diary = new Diary()
	const date = new Date("1995-12-17T03:24:10")
	const date_ = new Date("1995-12-17T03:24:00")
	const date__ = new Date("1995-12-11")
	const note = new Note("cxzcxz", date)
	const note_ = new Note("vcxgfd", date_)
	const note__ = new Note("rewr", date__)
	diary.notes.push(note, note_, note__)
	test.deepEqual(diary.getNotesByDate(date), [note, note_])
	test.deepEqual(diary.getNotesByDate(date__), [note__])
	test.deepEqual(diary.getNotesByDate(date__), [note__])
	test.done()
}

export function clearNotes(test) {
	test.expect(2)
	const diary = new Diary()
	diary.notes.push(new Note("cxzcxz", new Date()))
	test.strictEqual(diary.notes.length, 1)
	diary.clearNotes()
	test.strictEqual(diary.notes.length, 0)
	test.done()
}
