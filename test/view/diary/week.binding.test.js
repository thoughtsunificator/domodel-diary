import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import WeekModel from "../../../src/model/view/diary/week.js"

import WeekBinding from "../../../src/model/view/diary/week.binding.js"

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
	test.ok(new WeekBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	// const diary = new Diary()
	// const binding = new WeekBinding({ diary })
	// rootBinding.run(WeekModel, { binding })
	test.done()
}

export function remove(test) {
	test.done()
}
