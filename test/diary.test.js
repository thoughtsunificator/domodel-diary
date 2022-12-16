import test from "ava"
import { Observable } from "domodel"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"
import Notes from "../src/object/notes.js"
import Calendar from "../src/object/calendar.js"


test("Diary instance", (test) => {
	const date = new Date()
	const diary = new Diary(date)
	test.true(Diary.prototype instanceof Observable)
	test.true(diary.calendar instanceof Calendar)
	test.is(diary.calendar.date, date)
	test.is(diary.firstRun, true)
	test.is(diary.password, null)
	test.true(diary.notes instanceof Notes)
	test.notThrows(() => {
		diary.firstRun = ""
		diary.password = ""
	})
	test.throws(() => { diary.notes = "" })
	test.throws(() => { diary.editor = "" })
	test.throws(() => { diary.calendar = "" })
})

