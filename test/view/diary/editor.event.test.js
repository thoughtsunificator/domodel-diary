import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"

import EditorModel from "../../../src/model/view/diary/editor.js"

import EditorBinding from "../../../src/model/view/diary/editor.binding.js"

import EditorEventListener from "../../../src/model/view/diary/editor.event.js"

import Diary from "../../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("EditorEventListener instance", (test) => {
	test.true(EditorEventListener.prototype instanceof EventListener)
})

test("EditorEventListener onCreated", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// test.context.rootBinding.run(EditorModel, { binding })
	test.pass()
})

test("EditorEventListener editorOpen", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// test.context.rootBinding.run(EditorModel, { binding })
	test.pass()
})

test("EditorEventListener editorClose", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// test.context.rootBinding.run(EditorModel, { binding })
	test.pass()
})

test("EditorEventListener closeButon", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// test.context.rootBinding.run(EditorModel, { binding })
	// diary.editor.listen("close", data => {

	// })
	// binding.identifier.close.dispatchEvent(new test.context.window.Event('click'))
	// test.is(binding.identifier.content.value, "")
	test.pass()
})

test("EditorEventListener saveButton", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// test.context.rootBinding.run(EditorModel, { binding })
	// diary.editor.listen("close", data => {

	// })
	// binding.identifier.save.dispatchEvent(new test.context.window.Event('click'))
	test.pass()
})

test("EditorEventListener windowKeyup", (test) => {
	// const diary = new Diary()
	// const binding = new EditorBinding({ diary })
	// binding.opened = true
	// test.context.rootBinding.run(EditorModel, { binding })
	// diary.editor.listen("close", data => {

	// })
	// test.context.document.body.dispatchEvent(new test.context.window.Event('keyup', { keyCode: 27, bubbles: true }))
	test.pass()
})
