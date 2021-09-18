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
	test.ok(new CalendarBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.done()
}

export function setDate(test) {
	test.done()
}

export function setMonth(test) {
	test.done()
}

export function setYear(test) {
	test.done()
}

export function imported(test) {
	test.done()
}

export function todayButton(test) {
	test.done()
}

export function monthButton(test) {
	test.done()
}

export function previousMonthButton(test) {
	test.done()
}

export function nextMonthButton(test) {
	test.done()
}

export function yearButton(test) {
	test.done()
}
