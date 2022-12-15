import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import WeekModel from "../../../src/model/view/diary/week.js"

import WeekBinding from "../../../src/model/view/diary/week.binding.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("WeekBinding instance", (test) => {
	test.true(WeekBinding.prototype instanceof Binding)
})

test("WeekBinding onCreated", (test) => {
	// const diary = new Diary()
	// const binding = new WeekBinding({ diary })
	// test.context.rootBinding.run(WeekModel, { binding })
	test.pass()
})

