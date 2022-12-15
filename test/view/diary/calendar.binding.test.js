import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import CalendarModel from "../../../src/model/view/diary/calendar.js"

import CalendarBinding from "../../../src/model/view/diary/calendar.binding.js"

import Diary from "../../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("CalendarBinding instance", (test) => {
	test.true(CalendarBinding.prototype instanceof Binding)
})

test("CalendarBinding onCreated", (test) => {
	test.pass()
})
