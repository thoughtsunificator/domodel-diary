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
	test.ok(new AuthBinding() instanceof Binding)
	test.done()
}

export function onCreatedFirstRun(test) {
	test.expect(2)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	test.strictEqual(binding.identifier.status.textContent, "Welcome. First, set your password.\nIt will be used to decrypt your notes.")
	test.strictEqual(document.activeElement, binding.identifier.password)
	test.done()
}

export function onCreated(test) {
	test.expect(2)
	const router = new Router([])
	const diary = new Diary()
	diary.firstRun = false
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	test.strictEqual(binding.identifier.status.textContent, "Welcome back.")
	test.strictEqual(document.activeElement, binding.identifier.password)
	test.done()
}

export function authSuccess(test) {
	test.expect(2)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	router.listen("browse", data => {
		test.strictEqual(data.path, "/diary")
		test.strictEqual(diary.firstRun, false)
		test.done()
	})
	diary.emit("auth success")
}

export function authFail(test) {
	test.expect(1)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	diary.emit("auth fail")
	test.strictEqual(binding.identifier.status.textContent, "Authentication failed.")
	test.done()
}

export function resetButton(test) {
	test.expect(2)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	test.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
	binding.identifier.reset.dispatchEvent(new window.Event('click'))
	test.strictEqual(binding.identifier.confirmErase.style.visibility, "")
	test.done()
}

export function eraseButton(test) {
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	diary.listen("reset", () => {
		test.done()
	})
	binding.identifier.erase.dispatchEvent(new window.Event('click'))
}

export function cancelEraseButton(test) {
	test.expect(3)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	rootBinding.run(AuthModel(), { binding })
	test.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
	binding.identifier.confirmErase.style.visibility = ""
	test.strictEqual(binding.identifier.confirmErase.style.visibility, "")
	binding.identifier.cancelErase.dispatchEvent(new window.Event('click'))
	test.strictEqual(binding.identifier.confirmErase.style.visibility, "hidden")
	test.done()
}

export function submit(test) {
	test.expect(1)
	const router = new Router([])
	const diary = new Diary()
	const binding = new AuthBinding({ diary, router })
	rootBinding.run(AuthModel(), { binding })
	diary.listen("login", data => {
		test.strictEqual(data, "tescxzcxzct")
		test.done()
	})
	binding.identifier.password.value = "tescxzcxzct"
	binding.identifier.form.dispatchEvent(new window.Event('submit'))
}
