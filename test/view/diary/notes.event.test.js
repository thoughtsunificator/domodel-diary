import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import NotesEventListener from "../../../src/model/view/diary/notes.event.js"

import Diary from "../../../src/object/diary.js"
import Note from "../../../src/object/note.js"
import Day from "../../../src/object/day.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("NotesEventListener instance", (test) => {
	test.true(NotesEventListener.prototype instanceof EventListener)
})

test("NotesEventListener add", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		diary.calendar.day = new Day(diary.calendar.date)
		let updateIndicator = false
		diary.calendar.day.listen("updateIndicator", data => {
			updateIndicator = data
		})
		const binding = new NotesBinding({ diary })
		test.context.rootBinding.run(NotesModel, { binding })
		binding.paginator.listen("itemsSet", data => {
			test.deepEqual(data[0].properties.note.content, "czxczdsadsa")
			test.deepEqual(data[0].properties.note.date, diary.calendar.date)
			test.true(updateIndicator)
			resolve()
		})
		diary.notes.emit("add", { form: { content: "czxczdsadsa" } })
		test.deepEqual(diary.notes.notesList, [ new Note("czxczdsadsa", diary.calendar.date) ])
	})
})

test("NotesEventListener update", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		diary.calendar.day = new Day(new Date())
		const binding = new NotesBinding({ diary })
		test.context.rootBinding.run(NotesModel, { binding })
		const note = diary.notes.add("saidsiuahd", diary.calendar.date)
		let updated
		note.listen("update", () => {
			updated = true
		})
		binding.paginator.listen("itemsSet", data => {
			test.is(data.length, 1)
			test.deepEqual(data[0].properties.note.content, "czxczdsadsa")
			test.deepEqual(data[0].properties.note.date, diary.calendar.date)
			test.true(updated)
			resolve()
		})
		diary.notes.emit("update", { note, form: { content: "czxczdsadsa" } })
		test.deepEqual(diary.notes.notesList, [ note ])
	})
})

test("NotesEventListener remove", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			diary.calendar.day = new Day(new Date())
			const binding = new NotesBinding({ diary })
			test.context.rootBinding.run(NotesModel, { binding })
			const note = diary.notes.add("zxczxczxcsa", diary.calendar.date)
			let removed
			let indicatorUpdated 
			diary.calendar.day.listen("updateIndicator", data => {
				indicatorUpdated = data
			})
			note.listen("remove", () => {
				removed = true
			})
			binding.paginator.listen("itemsSet", data => {
				test.is(data.length, 0)
				test.true(removed)
				test.false(indicatorUpdated)
				resolve()
			})
			test.deepEqual(diary.notes.notesList, [ note ])
			diary.notes.emit("remove", note)
			test.deepEqual(diary.notes.notesList, [  ])
		}),
		new Promise(resolve => {
			const diary = new Diary()
			diary.calendar.day = new Day(new Date())
			const binding = new NotesBinding({ diary })
			test.context.rootBinding.run(NotesModel, { binding })
			const note = diary.notes.add("zxczxczxcsa", diary.calendar.date)
			const note2 = diary.notes.add("cxzcxzczx", diary.calendar.date)
			let indicatorUpdated 
			diary.calendar.day.listen("updateIndicator", data => {
				indicatorUpdated = data
			})
			binding.paginator.listen("itemsSet", data => {
				test.is(data.length, 1)
				test.true(indicatorUpdated)
				resolve()
			})
			test.deepEqual(diary.notes.notesList, [ note, note2 ])
			diary.notes.emit("remove", note)
			test.deepEqual(diary.notes.notesList, [ note2 ])
		})
	])
})

test("NotesEventListener clear", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		diary.calendar.day = new Day(new Date())
		const binding = new NotesBinding({ diary })
		test.context.rootBinding.run(NotesModel, { binding })
		const note = diary.notes.add("zxczxczxcsa", diary.calendar.date)
		const note2 = diary.notes.add("cxzcxzczx", diary.calendar.date)
		let indicatorUpdated
		diary.calendar.day.listen("updateIndicator", data => {
			indicatorUpdated = data
		})
		let remove = 0
		let index = 0
		note.listen("remove", () => {
			remove++
		})
		note2.listen("remove", () => {
			remove++
		})
		binding.paginator.listen("itemsSet", data => {
			if(index == 0) {
				test.is(data.length, 1)
				test.is(remove, 1)
				test.deepEqual(indicatorUpdated, true)
				test.deepEqual(diary.notes.notesList, [ note2])
			} else if(index == 1) {
				test.is(data.length, 0)
				test.is(remove, 2)
				test.deepEqual(indicatorUpdated, false)
				test.deepEqual(diary.notes.notesList, [  ])
				resolve()
			}
			index++
		})
		test.deepEqual(diary.notes.notesList, [ note, note2 ])
		diary.notes.emit("clear")
	})
})
