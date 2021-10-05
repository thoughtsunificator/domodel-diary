import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import CalendarModel from "../../../src/model/view/diary/calendar.js"

import CalendarBinding from "../../../src/model/view/diary/calendar.binding.js"

import Diary from "../../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("CalendarBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(CalendarBinding.prototype instanceof Binding)
	})

	it("onCreated", () => {

	})

	it("setDate", () => {

	})

	it("setMonth", () => {

	})

	it("setYear", () => {

	})

	it("imported", () => {

	})

	it("todayButton", () => {

	})

	it("monthButton", () => {

	})

	it("previousMonthButton", () => {

	})

	it("nextMonthButton", () => {

	})

	it("yearButton", () => {

	})

})
