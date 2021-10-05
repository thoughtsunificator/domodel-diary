import assert from "assert"
import { Observable } from "domodel"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"
import Notes from "../src/object/notes.js"
import Calendar from "../src/object/calendar.js"

describe("diary", () => {

	it("instance", () => {
		const date = new Date()
		const diary = new Diary(date)
		assert.ok(Diary.prototype instanceof Observable)
		assert.ok(diary.calendar instanceof Calendar)
		assert.strictEqual(diary.calendar.date, date)
		assert.strictEqual(diary.firstRun, true)
		assert.strictEqual(diary.password, null)
		assert.ok(diary.notes instanceof Notes)
		assert.doesNotThrow(() => {
			diary.firstRun = ""
			diary.password = ""
		})
		assert.throws(() => { diary.notes = "" })
		assert.throws(() => { diary.editor = "" })
		assert.throws(() => { diary.calendar = "" })
	})

})
