import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, Observable, EventListener } from "domodel"
import { Router } from "@domodel/router"

import AuthViewModel from "../../src/model/view/auth.js"
import AuthViewBinding from "../../src/model/view/auth.binding.js"

import AuthViewEventListener from "../../src/model/view/diary.event.js"

import Diary from "../../src/object/diary.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("AuthViewEventListener instance", (test) => {
	test.plan(1)
	test.true(AuthViewEventListener.prototype instanceof EventListener)
})

test("AuthViewEventListener success", (test) => {
	test.plan(2)
	return new Promise(resolve => {
		const router = new Router([])
		const diary = new Diary()
		router.listen("browse", data => {
			test.is(data.path, "/diary")
			test.is(diary.firstRun, false)
			resolve()
		})
		router._view = new Observable()
		const binding = new AuthViewBinding({ diary, router })
		test.context.rootBinding.run(AuthViewModel(), { binding })
		router._view.emit("success")
	})
})

test("AuthViewEventListener fail", (test) => {
	test.plan(1)
	const router = new Router([])
	router._view = new Observable()
	const diary = new Diary()
	const binding = new AuthViewBinding({ diary, router })
	test.context.rootBinding.run(AuthViewModel(), { binding })
	router.view.emit("fail")
	test.is(binding.identifier.status.textContent, "Authentication failed.")
})

