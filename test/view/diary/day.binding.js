import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import DayModel from "../../../src/model/view/diary/day.js"

import DayBinding from "../../../src/model/view/diary/day.binding.js"

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
	test.ok(new DayBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	const diary = new Diary()
	const day = new Day(new Date())
	const binding = new DayBinding({ diary, day })
	rootBinding.run(DayModel(day), { binding })
	test.done()
}

export function select(test) {
	test.done()
}

export function unselect(test) {
	test.done()
}

export function notesAdded(test) {
	test.done()
}

export function notesRemoved(test) {
	test.done()
}

export function click(test) {
	test.expect(1)
	const diary = new Diary()
	const day = new Day(new Date())
	const binding = new DayBinding({ diary, day })
	rootBinding.run(DayModel(day), { binding })
	diary.calendar.listen("set date", data => {
		test.deepEqual(data.date, day.date)
		test.done()
	})
	binding.root.dispatchEvent(new window.Event('click'))
}
