import assert from "assert"
import { Observable } from "domodel"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"
import Calendar from "../src/object/calendar.js"

describe("diary", () => {

	it("instance", () => {

		const date = new Date()
		const diary = new Diary(date)
		assert.ok(diary instanceof Observable)
		assert.ok(diary.calendar instanceof Calendar)
		assert.strictEqual(diary.calendar.date, date)
		assert.strictEqual(diary.firstRun, true)
		assert.strictEqual(diary.password, null)
		assert.ok(Array.isArray(diary.notes))
		assert.strictEqual(diary.notes.length, 0)
		assert.doesNotThrow(() => {
			diary.calendar = ""
			diary.firstRun = ""
			diary.password = ""
		})
		assert.throws(() => {
			diary.notes = []
		})

	})

	it("toString", () => {

		const diary = new Diary()
		const date = new Date()
		const date_ = new Date()
		diary.notes.push(new Note("cxzcxz", date))
		diary.notes.push(new Note("tesfdsfd", date_))
		assert.deepEqual(JSON.parse(diary.toString()), [
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

	it("addNote", () => {

		const diary = new Diary()
		diary.password = "Hello"
		const date = new Date()
		const date_ = new Date()
		diary.addNote("dsads", date)
		assert.strictEqual(diary.notes.length, 1)
		diary.addNote("cxzcxgd", date_)
		assert.strictEqual(diary.notes.length, 2)
		assert.strictEqual(diary.notes[0].content, "dsads")
		assert.strictEqual(diary.notes[0].date, date)
		assert.strictEqual(diary.notes[1].content, "cxzcxgd")
		assert.strictEqual(diary.notes[1].date, date_)

	})

	it("removeNote", () => {

		const diary = new Diary()
		const note = new Note("cxzcxz", new Date())
		diary.notes.push(note)
		assert.strictEqual(diary.notes.length, 1)
		diary.removeNote(note)
		assert.strictEqual(diary.notes.length, 0)

	})

	it("updateNote", () => {

		const diary = new Diary()
		const note = new Note("cxzcxz", new Date())
		diary.notes.push(note)
		assert.strictEqual(diary.notes[0].content, "cxzcxz")
		diary.updateNote(note, { content: "test" })
		assert.strictEqual(diary.notes[0].content, "test")

	})

	it("getNotesByDate", () => {

		const diary = new Diary()
		const date = new Date("1995-12-17T03:24:10")
		const date_ = new Date("1995-12-17T03:24:00")
		const date__ = new Date("1995-12-11")
		const note = new Note("cxzcxz", date)
		const note_ = new Note("vcxgfd", date_)
		const note__ = new Note("rewr", date__)
		diary.notes.push(note, note_, note__)
		assert.deepEqual(diary.getNotesByDate(date), [note, note_])
		assert.deepEqual(diary.getNotesByDate(date__), [note__])
		assert.deepEqual(diary.getNotesByDate(date__), [note__])

	})

	it("clearNotes", () => {

		const diary = new Diary()
		diary.notes.push(new Note("cxzcxz", new Date()))
		assert.strictEqual(diary.notes.length, 1)
		diary.clearNotes()
		assert.strictEqual(diary.notes.length, 0)

	})

})
