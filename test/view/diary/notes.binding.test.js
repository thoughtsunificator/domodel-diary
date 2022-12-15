import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("NotesBinding instance", (test) => {
	test.true(NotesBinding.prototype instanceof Binding)
})

test("NotesBinding onCreated", (test) => {
	// const diary = new Diary()
	// const binding = new NotesBinding({ diary })
	// test.context.rootBinding.run(NotesModel, { binding })
	test.pass()
})

