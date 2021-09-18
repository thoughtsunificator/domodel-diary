import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import Diary from "../../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

export function setUp(callback) {
	rootBinding = new Binding()
	Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	callback()
}

export function tearDown(callback) {
	rootBinding.remove()
	callback()
}

export function instance(test) {
	test.expect(1)
	test.ok(new NotesBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	// const diary = new Diary()
	// const binding = new NotesBinding({ diary })
	// rootBinding.run(NotesModel, { binding })
	test.done()
}

export function render(test) {
	test.done()
}

export function itemsChanged(test) {
	test.done()
}

export function notesAdd(test) {
	test.done()
}

export function notesUpdate(test) {
	test.done()
}

export function notesRemove(test) {
	test.done()
}

export function dateUpdated(test) {
	test.done()
}

export function notesAdded(test) {
	test.done()
}

export function notesRemoved(test) {
	test.done()
}
