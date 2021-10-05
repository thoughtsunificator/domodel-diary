import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable } from "domodel"
import { PopupModel, Popup } from "@domodel/popup"
import { Router } from "@domodel/router"

import DiaryViewModel from "../../src/model/view/diary.js"
import NotesModel from "../../src/model/view/diary/notes.js"
import EditorModel from "../../src/model/view/diary/editor.js"
import CalendarModel from "../../src/model/view/diary/calendar.js"
import SettingsModel from "../../src/model/view/diary/settings.js"

import DiaryViewBinding from "../../src/model/view/diary.binding.js"
import CalendarBinding from "../../src/model/view/diary/calendar.binding.js"
import EditorBinding from "../../src/model/view/diary/editor.binding.js"
import NotesBinding from "../../src/model/view/diary/notes.binding.js"
import SettingsBinding from "../../src/model/view/diary/settings.binding.js"

import Diary from "../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("DiaryViewBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(DiaryViewBinding.prototype instanceof Binding)
	})

	it("onCreated", () => {
		const diary = new Diary()
		const router = new Router([])
		router.view = new Observable()
		const binding = new DiaryViewBinding({ diary, router })
		rootBinding.run(DiaryViewModel(), { binding })
		assert.strictEqual(binding.textFileURL, null)
		assert.strictEqual(binding.interval, 1)
		assert.deepEqual(DiaryViewBinding.INACTIVITY_TIMER_DELAY, (60 * 1000) * 15)
		assert.deepEqual(binding._children[0].model, CalendarModel)
		assert.deepEqual(binding._children[1].model, NotesModel)
		assert.deepEqual(binding._children[2].model, EditorModel)
		assert.deepEqual(binding._children[3].model, PopupModel(SettingsModel))
		assert.deepEqual(binding._children[0].root, binding.identifier.content)
		assert.deepEqual(binding._children[1].root, binding.identifier.content)
		assert.ok(binding._children[0] instanceof CalendarBinding)
		assert.ok(binding._children[1] instanceof NotesBinding)
		assert.ok(binding._children[2] instanceof EditorBinding)
		assert.ok(binding._children[3] instanceof SettingsBinding)
		assert.ok(binding._children[3].properties.popup instanceof Popup)
		window.clearInterval(binding.interval)
	})

	// it("startInactivityTimer", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	DiaryViewBinding.INACTIVITY_TIMER_DELAY = 120
	// 	let emitted = false
	// 	diary.listen("logout", () => {
	// 		emitted = true
	// 	})
	// 	binding.startInactivityTimer()
	// 	assert.strictEqual(binding.interval._idleTimeout, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._repeat, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.ok(emitted)
	// })

	// it("stopInactivityTimer", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	binding.startInactivityTimer()
	// 	binding.stopInactivityTimer()
	// 	assert.strictEqual(binding.interval._idleTimeout, -1)
	// 	assert.strictEqual(binding.interval._destroyed, true)
	// 	assert.strictEqual(binding.interval._onTimeout, null)
	// })

	// it("restartInactivityTimer", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	binding.startInactivityTimer()
	// 	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	// 	binding.restartInactivityTimer()
	// 	assert.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	// 	assert.strictEqual(binding.interval._idleTimeout, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._repeat, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._destroyed, false)
	// })

	it("export_", () => {

	})

	it("import_", () => {

	})

	// it("authSuccess", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	DiaryViewBinding.INACTIVITY_TIMER_DELAY = 120
	// 	let emitted = false
	// 	diary.listen("logout", () => {
	// 		emitted = true
	// 	})
	// 	diary.emit("auth success")
	// 	assert.strictEqual(binding.identifier.navigation.style.display, "block")
	// 	assert.strictEqual(binding.interval._idleTimeout, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._repeat, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.ok(emitted)
	// })

	// it("logout", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	binding.startInactivityTimer()
	// 	diary.emit("logout")
	// 	assert.strictEqual(binding.interval._idleTimeout, -1)
	// 	assert.strictEqual(binding.interval._destroyed, true)
	// 	assert.strictEqual(binding.interval._onTimeout, null)
	// })

	// it("windowClick", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	binding.startInactivityTimer()
	// 	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	// 	document.body.dispatchEvent(new window.Event("click", { bubbles: true }))
	// 	assert.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	// 	assert.strictEqual(binding.interval._idleTimeout, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._repeat, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._destroyed, false)
	// })

	// it("windowInput", () => {
	// 	const diary = new Diary()
	// 	const router = new Router([])
	//  router.view = new Observable()
	// 	const binding = new DiaryViewBinding({ diary, router })
	// 	rootBinding.run(DiaryViewModel(), { binding })
	// 	binding.startInactivityTimer()
	// 	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	// 	document.body.dispatchEvent(new window.Event("input", { bubbles: true }))
	// 	assert.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	// 	assert.strictEqual(binding.interval._idleTimeout, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._repeat, DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	// 	assert.strictEqual(binding.interval._destroyed, false)
	// })

	it("menuButton", () => {
		const diary = new Diary()
		const router = new Router([])
		router.view = new Observable()
		const binding = new DiaryViewBinding({ diary, router })
		rootBinding.run(DiaryViewModel(), { binding })
		let emitted = false
		diary.listen("openSettings", () => {
			emitted = true
		})
		binding.identifier.menu.dispatchEvent(new window.Event("click"))
		assert.ok(emitted)
		window.clearInterval(binding.interval)
	})

	it("addNoteButton", () => {
		const diary = new Diary()
		const router = new Router([])
		router.view = new Observable()
		const binding = new DiaryViewBinding({ diary, router })
		rootBinding.run(DiaryViewModel(), { binding })
		let emitted = false
		diary.editor.listen("open", () => {
			emitted = true
		})
		binding.identifier.addNote.dispatchEvent(new window.Event("click"))
		assert.ok(emitted)
		window.clearInterval(binding.interval)
	})

})
