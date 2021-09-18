import assert from "assert"
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

describe("view/diary/settings", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

			assert.ok(new SettingsBinding() instanceof PopupBinding)

	})

	it("onCreated", () => {
		// const diary = new Diary()
		// const binding = new SettingsBinding({ diary })
		// rootBinding.run(SettingsModel, { binding })

	})

	it("settingsPopup", () => {

	})

	it("exportButton", () => {

	})

	it("importButton", () => {

	})

	it("logoutButton", () => {

	})

})
