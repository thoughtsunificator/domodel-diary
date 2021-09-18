import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { PopupBinding } from "@domodel/popup"

import SettingsModel from "../../../src/model/view/diary/settings.js"

import SettingsBinding from "../../../src/model/view/diary/settings.binding.js"

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
	test.ok(new SettingsBinding() instanceof PopupBinding)
	test.done()
}

export function onCreated(test) {
	// const diary = new Diary()
	// const binding = new SettingsBinding({ diary })
	// rootBinding.run(SettingsModel, { binding })
	test.done()
}

export function settingsPopup(test) {
	test.done()
}

export function exportButton(test) {
	test.done()
}

export function importButton(test) {
	test.done()
}

export function logoutButton(test) {
	test.done()
}

