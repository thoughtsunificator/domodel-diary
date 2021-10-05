import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable } from "domodel"
import { Router } from "@domodel/router"

import AuthViewModel from "../../src/model/view/auth.js"
import AuthViewBinding from "../../src/model/view/auth.binding.js"

import Diary from "../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("AuthViewBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(AuthViewBinding.prototype instanceof Binding)
	})

	it("onCreatedFirstRun", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		assert.strictEqual(binding.identifier.status.textContent, "Welcome. First, set your password.\nIt will be used to decrypt your notes.")
		assert.strictEqual(document.activeElement, binding.identifier.password)
	})

	it("onCreated", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		diary.firstRun = false
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		assert.strictEqual(binding.identifier.status.textContent, "Welcome back.")
		assert.strictEqual(document.activeElement, binding.identifier.password)

	})

	it("success", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		router.listen("browse", data => {
			assert.strictEqual(data.path, "/diary")
			assert.strictEqual(diary.firstRun, false)
		})
		diary.emit("success")
	})

	it("fail", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		router.view.emit("fail")
		assert.strictEqual(binding.identifier.status.textContent, "Authentication failed.")
	})

	it("resetButton", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
		binding.identifier.reset.dispatchEvent(new window.Event('click'))
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "")
	})

	it("eraseButton", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		diary.listen("reset", () => {

		})
		binding.identifier.erase.dispatchEvent(new window.Event('click'))
	})

	it("cancelEraseButton", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		rootBinding.run(AuthViewModel(), { binding })
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
		binding.identifier.confirmErase.style.visibility = ""
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "")
		binding.identifier.cancelErase.dispatchEvent(new window.Event('click'))
		assert.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
	})

	it("submit", () => {
		const router = new Router([])
		router.view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		rootBinding.run(AuthViewModel(), { binding })
		diary.listen("login", data => {
			assert.strictEqual(data, "tescxzcxzct")
		})
		binding.identifier.password.value = "tescxzcxzct"
		binding.identifier.form.dispatchEvent(new window.Event('submit'))
	})

})
