import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import DayModel from "../../../src/model/view/diary/day.js"

import DayBinding from "../../../src/model/view/diary/day.binding.js"

import DayEventListener from "../../../src/model/view/diary/day.event.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DayEventListener instance", (test) => {
	test.true(DayEventListener.prototype instanceof EventListener)
})

test("DayEventListener select", (test) => {
	test.pass()
})

test("DayEventListener unselect", (test) => {
	test.pass()
})

test("DayEventListener notesAdded", (test) => {
	test.pass()
})

test("DayEventListener notesRemoved", (test) => {
	test.pass()
})
