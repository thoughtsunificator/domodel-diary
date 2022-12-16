import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import EditorModel from "../../../src/model/view/diary/editor.js"

import EditorBinding from "../../../src/model/view/diary/editor.binding.js"

import EditorEventListener from "../../../src/model/view/diary/editor.event.js"

import Diary from "../../../src/object/diary.js"
import Note from "../../../src/object/note.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("EditorEventListener instance", (test) => {
	test.true(EditorEventListener.prototype instanceof EventListener)
})

test("EditorBinding open", (test) => {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	test.context.rootBinding.run(EditorModel, { binding })
	const note = new Note("tdsasdadsadsaest", new Date())
	diary.editor.emit("open", note)
	test.true(diary.editor.opened)
	test.is(diary.editor.note, note)
	test.is(binding.identifier.content.value, note.content)
	test.is(binding.root.style.display, "grid")
	diary.editor.emit("open", new Note("cxzcxzcxz", new Date()))
	test.is(diary.editor.note, note)
	test.is(binding.identifier.content.value, note.content)
})

test("EditorBinding close", (test) => {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	const note = new Note("tdsasdadsadsaest", new Date())
	test.context.rootBinding.run(EditorModel, { binding })
	binding.identifier.content.value = "yucgxzyucxzc"
	diary.editor.note = note
	diary.editor.emit("close", note)
	test.false(diary.editor.opened)
	test.is(diary.editor.note, null)
	test.is(binding.identifier.content.value, "yucgxzyucxzc")
	test.is(binding.root.style.display, "none")
})
