import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import EditorModel from "../../../src/model/view/diary/editor.js"

import EditorBinding from "../../../src/model/view/diary/editor.binding.js"


import Note from "../../../src/object/note.js"
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

test("EditorBinding onCreated", (test) => {
	const diary = new Diary()
	const binding = new EditorBinding({ diary })
	test.context.rootBinding.run(EditorModel, { binding })
	test.pass()
})

test("EditorEventListener closeButon", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		test.context.rootBinding.run(EditorModel, { binding })
		diary.editor.listen("close", data => {
			test.is(binding.identifier.content.value, "dsadhuisahdsa")
			resolve()
		})
		binding.identifier.content.value = "dsadhuisahdsa"
		binding.identifier.close.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("EditorEventListener saveButton", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new EditorBinding({ diary })
			let addData
			test.context.rootBinding.run(EditorModel, { binding })
			let closes = 0
			diary.editor.listen("close", data => {
				closes++
			})
			diary.notes.listen("add", data => {
				addData = data
			})
			binding.identifier.content.value = "dsaiudsuyagduisajdscyixzc"
			binding.identifier.save.dispatchEvent(new test.context.window.Event('click'))
			setTimeout(() => {
				test.deepEqual(addData, { form: { content: "dsaiudsuyagduisajdscyixzc" } })
				test.is(binding.identifier.content.value, "")
				test.is(closes, 1)
				resolve()
			})
		}),
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new EditorBinding({ diary })
			let updateData
			test.context.rootBinding.run(EditorModel, { binding })
			let closes = 0
			const note = new Note("tdsasdadsadsaest", new Date())
			diary.editor.note = note
			diary.editor.listen("close", data => {
				closes++
			})
			diary.notes.listen("update", data => {
				updateData = data
			})
			binding.identifier.content.value = "dsaiudsuyagduisajdscyixzc"
			binding.identifier.save.dispatchEvent(new test.context.window.Event('click'))
			setTimeout(() => {
				test.deepEqual(updateData, { note, form: { content: "dsaiudsuyagduisajdscyixzc" } })
				test.is(binding.identifier.content.value, "")
				test.is(closes, 1)
				resolve()
			})
		})
	])
})

test("EditorEventListener windowKeyup", (test) => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new EditorBinding({ diary })
		test.context.rootBinding.run(EditorModel, { binding })
		let closes = 0
		diary.editor.listen("close", data => {
			closes++
		})
		test.context.document.dispatchEvent(new test.context.window.KeyboardEvent('keyup', { keyCode: 27, bubbles: true }))
		diary.editor.opened = true
		binding.identifier.content.value = "dewqewqewqewq"
		test.context.document.dispatchEvent(new test.context.window.KeyboardEvent('keyup', { keyCode: 27, bubbles: true }))
		setTimeout(() => {
			test.is(closes, 1)
			test.is(binding.identifier.content.value, "dewqewqewqewq")
			resolve()
		})
	})
})
