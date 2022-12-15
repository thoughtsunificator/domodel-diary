import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import EditorModel from "../../../src/model/view/diary/editor.js"

import EditorBinding from "../../../src/model/view/diary/editor.binding.js"

import Diary from "../../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("EditorBinding instance", (test) => {
	test.true(EditorBinding.prototype instanceof Binding)
})

