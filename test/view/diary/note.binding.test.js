import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { ItemBinding, Page } from "@domodel/paginator"

import NoteModel from "../../../src/model/view/diary/note.js"

import NoteBinding from "../../../src/model/view/diary/note.binding.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("NoteBinding instance", (test) => {
	test.true(NoteBinding.prototype instanceof Binding)
})

test("NoteBinding onCreated", (test) => {
	const diary = new Diary()
	const day = new Day(new Date())
	const page = new Page()
	const note = new Note("test", new Date())
	const binding = new NoteBinding({ note, diary, day, page })
	test.context.rootBinding.run(NoteModel({ note }), { binding })
	test.pass()
})

test("NoteBinding edit button", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const day = new Day(new Date())
		const page = new Page()
		const note = new Note("test", new Date())
		const binding = new NoteBinding({ note, diary, day, page })
		test.context.rootBinding.run(NoteModel({ note }), { binding })
		diary.editor.listen("open", data => {
			test.is(data, note)
			resolve()
		})
		binding.identifier.edit.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("NoteBinding remove button", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const day = new Day(new Date())
		const page = new Page()
		const note = new Note("test", new Date())
		const binding = new NoteBinding({ note, diary, day, page })
		test.context.rootBinding.run(NoteModel({ note }), { binding })
		diary.notes.listen("remove", data => {
			test.is(data, note)
			resolve()
		})
		binding.identifier.remove.dispatchEvent(new test.context.window.Event('click'))
	})
})
