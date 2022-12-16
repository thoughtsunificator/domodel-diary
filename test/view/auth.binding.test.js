import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable } from "domodel"
import { Router } from "@domodel/router"

import AuthViewModel from "../../src/model/view/auth.js"
import AuthViewBinding from "../../src/model/view/auth.binding.js"

import Diary from "../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("AuthViewBinding instance", (test) => {
	test.true(AuthViewBinding.prototype instanceof Binding)
})

test("AuthViewBinding onCreatedFirstRun", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	test.is(binding.identifier.status.textContent, "Welcome. First, set your password.\nIt will be used to decrypt your notes.")
	test.is(test.context.document.activeElement, binding.identifier.password)
})

test("AuthViewBinding onCreated", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	diary.firstRun = false
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	test.is(binding.identifier.status.textContent, "Welcome back.")
	test.is(test.context.document.activeElement, binding.identifier.password)

})

test("AuthViewBinding success", (test) => {
	return new Promise(resolve => {
		const router = new Router([])
		router.listen("browse", data => {
			test.is(data.path, "/diary")
			test.is(diary.firstRun, false)
			resolve()
		})
		router._view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		test.context.rootBinding.run(AuthViewModel(), { binding })
		router._view.emit("success")
	})
})

test("AuthViewBinding fail", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	router._view.emit("fail")
	test.is(binding.identifier.status.textContent, "Authentication failed.")
})

test("AuthViewBinding resetButton", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	test.is(binding.identifier.confirmErase.style.visibility, "hidden")
	binding.identifier.reset.dispatchEvent(new test.context.window.Event('click'))
	test.is(binding.identifier.confirmErase.style.visibility, "")
})

test("AuthViewBinding eraseButton", (test) => {
	return new Promise(resolve => {
		const router = new Router([])
		router._view = new Observable()
		const diary = new Diary()
		const binding = new AuthViewBinding({ diary, router })
		test.context.rootBinding.run(AuthViewModel(), { binding })
		diary.listen("reset", () => {
			test.pass()
			resolve()
		})
		binding.identifier.erase.dispatchEvent(new test.context.window.Event('click'))
	})
})

test("AuthViewBinding cancelEraseButton", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	test.is(binding.identifier.confirmErase.style.visibility, "hidden")
	binding.identifier.confirmErase.style.visibility = ""
	test.is(binding.identifier.confirmErase.style.visibility, "")
	binding.identifier.cancelErase.dispatchEvent(new test.context.window.Event('click'))
	test.is(binding.identifier.confirmErase.style.visibility, "hidden")
})

test("AuthViewBinding submit", (test) => {
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	diary.listen("login", data => {
		test.is(data, "tescxzcxzct")
	})
	binding.identifier.password.value = "tescxzcxzct"
	binding.identifier.form.dispatchEvent(new test.context.window.Event('submit'))
})

