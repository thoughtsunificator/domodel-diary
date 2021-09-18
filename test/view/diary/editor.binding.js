import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import EditorModel from "../../../src/model/view/diary/editor.js"

import EditorBinding from "../../../src/model/view/diary/editor.binding.js"

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
	test.ok(new EditorBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	rootBinding.run(EditorModel, { binding })
	test.done()
}

export function editorOpen(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	rootBinding.run(EditorModel, { binding })
	test.done()
}

export function editorClose(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	rootBinding.run(EditorModel, { binding })
	test.done()
}

export function closeButon(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	rootBinding.run(EditorModel, { binding })
	diary.listen("editor close", data => {
		test.done()
	})
	binding.identifier.close.dispatchEvent(new window.Event('click'))
	test.strictEqual(binding.identifier.content.value, "")
}

export function saveButton(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	rootBinding.run(EditorModel, { binding })
	diary.listen("editor close", data => {
		test.done()
	})
	binding.identifier.save.dispatchEvent(new window.Event('click'))
}

export function windowKeyup(test) {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	binding.opened = true
	rootBinding.run(EditorModel, { binding })
	diary.listen("editor close", data => {
		test.done()
	})
	document.body.dispatchEvent(new window.Event('keyup', { keyCode: 27, bubbles: true }))
	test.done()
}

