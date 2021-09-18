import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { ItemBinding, Page } from "@domodel/paginator"

import NoteModel from "../../../src/model/view/diary/note.js"

import NoteBinding from "../../../src/model/view/diary/note.binding.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"

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
	test.ok(new NoteBinding() instanceof ItemBinding)
	test.done()
}

export function onCreated(test) {
	const diary = new Diary()
	const day = new Day(new Date())
	const page = new Page()
	const note = new Note("test", new Date())
	const binding = new NoteBinding({ note, diary, day, page })
	rootBinding.run(NoteModel({ note }), { binding })
	test.done()
}

export function remove(test) {
	test.done()
}

export function update(test) {
	test.done()
}

export function editButton(test) {
	test.done()
}

export function removeButton(test) {
	test.done()
}
