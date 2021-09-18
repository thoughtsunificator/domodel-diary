import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { Router } from "@domodel/router"

import AuthModel from "../../src/model/view/auth.js"
import AuthBinding from "../../src/model/view/auth.binding.js"

import Diary from "../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("view/auth", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

			assert.ok(new AuthBinding() instanceof Binding)

	})

	it("onCreatedFirstRun", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		assert.strictEqual(binding.identifier.status.textContent, "Welcome. First, set your password.\nIt will be used to decrypt your notes.")
		assert.strictEqual(document.activeElement, binding.identifier.password)

	})

	it("onCreated", () => {

		const router = new Router([])
		const diary = new Diary()
		diary.firstRun = false
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		assert.strictEqual(binding.identifier.status.textContent, "Welcome back.")
		assert.strictEqual(document.activeElement, binding.identifier.password)

	})

	it("authSuccess", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		router.listen("browse", data => {
			assert.strictEqual(data.path, "/diary")
			assert.strictEqual(diary.firstRun, false)

		})
		diary.emit("auth success")

	})

	it("authFail", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		diary.emit("auth fail")
		assert.strictEqual(binding.identifier.status.textContent, "Authentication failed.")

	})

	it("resetButton", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
		binding.identifier.reset.dispatchEvent(new window.Event('click'))
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "")

	})

	it("eraseButton", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		diary.listen("reset", () => {

		})
		binding.identifier.erase.dispatchEvent(new window.Event('click'))

	})

	it("cancelEraseButton", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		rootBinding.run(AuthModel(), { binding })
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
		binding.identifier.confirmErase.style.visibility = ""
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "")
		binding.identifier.cancelErase.dispatchEvent(new window.Event('click'))
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")

	})

	it("submit", () => {

		const router = new Router([])
		const diary = new Diary()
		const binding = new AuthBinding({ diary, router })
		rootBinding.run(AuthModel(), { binding })
		diary.listen("login", data => {
			assert.strictEqual(data, "tescxzcxzct")
		})
		binding.identifier.password.value = "tescxzcxzct"
		binding.identifier.form.dispatchEvent(new window.Event('submit'))

	})

})
