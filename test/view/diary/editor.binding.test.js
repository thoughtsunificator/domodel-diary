import assert from "assert"
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

describe("EditorBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(EditorBinding.prototype instanceof Binding)
	})

	it("onCreated", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		rootBinding.run(EditorModel, { binding })
	})

	it("editorOpen", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		rootBinding.run(EditorModel, { binding })
	})

	it("editorClose", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		rootBinding.run(EditorModel, { binding })
	})

	it("closeButon", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		rootBinding.run(EditorModel, { binding })
		diary.editor.listen("close", data => {

		})
		binding.identifier.close.dispatchEvent(new window.Event('click'))
		assert.strictEqual(binding.identifier.content.value, "")
	})

	it("saveButton", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		rootBinding.run(EditorModel, { binding })
		diary.editor.listen("close", data => {

		})
		binding.identifier.save.dispatchEvent(new window.Event('click'))
	})

	it("windowKeyup", () => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		binding.opened = true
		rootBinding.run(EditorModel, { binding })
		diary.editor.listen("close", data => {

		})
		document.body.dispatchEvent(new window.Event('keyup', { keyCode: 27, bubbles: true }))
	})

})
