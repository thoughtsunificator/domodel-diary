import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import NotesEventListener from "../../../src/model/view/diary/notes.event.js"

import Diary from "../../../src/object/diary.js"


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

test("NotesEventListener itemsChanged", (test) => {
	test.pass()
})

test("NotesEventListener notesAdd", (test) => {
	test.pass()
})

test("NotesEventListener notesUpdate", (test) => {
	test.pass()
})

test("NotesEventListener notesRemove", (test) => {
	test.pass()
})

test("NotesEventListener dateUpdated", (test) => {
	test.pass()
})

test("NotesEventListener notesAdded", (test) => {
	test.pass()
})

test("NotesEventListener notesRemoved", (test) => {
	test.pass()
})

