import assert from "assert"
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

describe("DayBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(DayBinding.prototype instanceof Binding)
	})

	it("onCreated", () => {
		const diary = new Diary()
		const day = new Day(new Date())
		const binding = new DayBinding({ diary, day })
		rootBinding.run(DayModel(day), { binding })
	})

	it("select", () => {

	})

	it("unselect", () => {

	})

	it("notesAdded", () => {

	})

	it("notesRemoved", () => {

	})

	it("click", () => {
		const diary = new Diary()
		const day = new Day(new Date())
		const binding = new DayBinding({ diary, day })
		rootBinding.run(DayModel(day), { binding })
		diary.calendar.listen("set date", data => {
			assert.deepEqual(data.date, day.date)

		})
		binding.root.dispatchEvent(new window.Event('click'))
	})

})
