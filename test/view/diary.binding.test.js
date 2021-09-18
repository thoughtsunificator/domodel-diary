import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { PopupModel, Popup } from "@domodel/popup"
import { Router } from "@domodel/router"

import DiaryModel from "../../src/model/view/diary.js"
import NotesModel from "../../src/model/view/diary/notes.js"
import EditorModel from "../../src/model/view/diary/editor.js"
import CalendarModel from "../../src/model/view/diary/calendar.js"
import SettingsModel from "../../src/model/view/diary/settings.js"

import DiaryBinding from "../../src/model/view/diary.binding.js"
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
	test.ok(new DiaryBinding() instanceof Binding)
	test.done()
}

export function _onCreated(test) {
	test.expect(14)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	test.strictEqual(binding.textFileURL, null)
	test.strictEqual(binding.interval, null)
	test.deepEqual(DiaryBinding.INACTIVITY_TIMER_DELAY, (60 * 1000) * 15)
	test.deepEqual(binding._children[0].model, CalendarModel)
	test.deepEqual(binding._children[1].model, NotesModel)
	test.deepEqual(binding._children[2].model, EditorModel)
	test.deepEqual(binding._children[3].model, PopupModel(SettingsModel))
	test.deepEqual(binding._children[0].root, binding.identifier.content)
	test.deepEqual(binding._children[1].root, binding.identifier.content)
	test.ok(binding._children[0] instanceof CalendarBinding)
	test.ok(binding._children[1] instanceof NotesBinding)
	test.ok(binding._children[2] instanceof EditorBinding)
	test.ok(binding._children[3] instanceof SettingsBinding)
	test.ok(binding._children[3].properties.popup instanceof Popup)
	test.done()
}

export function startInactivityTimer(test) {
	test.expect(2)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	DiaryBinding.INACTIVITY_TIMER_DELAY = 120
	diary.listen("logout", () => {
		test.done()
	})
	binding.startInactivityTimer()
	test.strictEqual(binding.interval._idleTimeout, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._repeat, DiaryBinding.INACTIVITY_TIMER_DELAY)
}

export function stopInactivityTimer(test) {
	test.expect(3)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	binding.startInactivityTimer()
	binding.stopInactivityTimer()
	test.strictEqual(binding.interval._idleTimeout, -1)
	test.strictEqual(binding.interval._destroyed, true)
	test.strictEqual(binding.interval._onTimeout, null)
	test.done()
}

export function restartInactivityTimer(test) {
	test.expect(4)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	binding.startInactivityTimer()
	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	binding.restartInactivityTimer()
	test.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	test.strictEqual(binding.interval._idleTimeout, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._repeat, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._destroyed, false)
	test.done()
}

export function export_(test) {
	test.done()
}

export function import_(test) {
	test.done()
}

export function authSuccess(test) {
	test.expect(3)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	DiaryBinding.INACTIVITY_TIMER_DELAY = 120
	diary.listen("logout", () => {
		test.done()
	})
	diary.emit("auth success")
	test.strictEqual(binding.identifier.navigation.style.display, "block")
	test.strictEqual(binding.interval._idleTimeout, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._repeat, DiaryBinding.INACTIVITY_TIMER_DELAY)
}

export function logout(test) {
	test.expect(3)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	binding.startInactivityTimer()
	diary.emit("logout")
	test.strictEqual(binding.interval._idleTimeout, -1)
	test.strictEqual(binding.interval._destroyed, true)
	test.strictEqual(binding.interval._onTimeout, null)
	test.done()
}

export function windowClick(test) {
	test.expect(4)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	binding.startInactivityTimer()
	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	document.body.dispatchEvent(new window.Event("click", { bubbles: true }))
	test.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	test.strictEqual(binding.interval._idleTimeout, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._repeat, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._destroyed, false)
	test.done()
}

export function windowInput(test) {
	test.expect(4)
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	binding.startInactivityTimer()
	let timeoutId = binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]]
	document.body.dispatchEvent(new window.Event("input", { bubbles: true }))
	test.notStrictEqual(binding.interval[Object.getOwnPropertySymbols(binding.interval)[2]], timeoutId)
	test.strictEqual(binding.interval._idleTimeout, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._repeat, DiaryBinding.INACTIVITY_TIMER_DELAY)
	test.strictEqual(binding.interval._destroyed, false)
	test.done()
}

export function menuButton(test) {
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	diary.listen("settings popup", () => {
		test.done()
	})
	binding.identifier.menu.dispatchEvent(new window.Event("click"))
}

export function addNoteButton(test) {
	const diary = new Diary()
	const router = new Router([])
	const binding = new DiaryBinding({ diary, router })
	rootBinding.run(DiaryModel(), { binding })
	diary.listen("editor open", () => {
		test.done()
	})
	binding.identifier.addNote.dispatchEvent(new window.Event("click"))
}

