import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import CalendarModel from "../../../src/model/view/diary/calendar.js"

import CalendarBinding from "../../../src/model/view/diary/calendar.binding.js"

import CalendarEventListener from "../../../src/model/view/diary/calendar.event.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("CalendarEventListener instance", (test) => {
	test.true(CalendarEventListener.prototype instanceof EventListener)
})

test("CalendarEventListener setDate", (test) => {
	const diary = new Diary()
	const binding = new CalendarBinding({ diary })
	test.context.rootBinding.run(CalendarModel, { binding })
	const date = new Date()
	diary.calendar.emit("setDate", { date })
	test.is(binding.identifier.date.textContent, date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
	test.is(binding.identifier.month.selectedIndex, date.getMonth())
	test.is(binding.identifier.year.value, `${date.getFullYear()}`)
	test.deepEqual(diary.calendar.date, date)
})


test("CalendarEventListener setMonth", (test) => {
	test.pass()
})

test("CalendarEventListener setYear", (test) => {
	test.pass()
})

test("CalendarEventListener imported", (test) => {
	test.pass()
})

test("CalendarEventListener todayButton", (test) => {
	test.pass()
})

test("CalendarEventListenermonthButton", (test) => {
	test.pass()
})

test("CalendarEventListener previousMonthButton", (test) => {
	test.pass()
})

test("CalendarEventListener nextMonthButton", (test) => {
	test.pass()
})

test("CalendarEventListener yearButton", (test) => {
	test.pass()
})
