import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { Router, RouterModel, RouterBinding } from "@domodel/router"

import DiaryModel from "../src/model/diary.js"
import DiaryViewModel from "../src/model/view/diary.js"
import AuthViewModel from "../src/model/view/auth.js"

import DiaryBinding from "../src/model/diary.binding.js"
import DiaryViewBinding from "../src/model/view/diary.binding.js"
import AuthViewBinding from "../src/model/view/auth.binding.js"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"
const url = "https://localhost/"

const virtualDOM = new JSDOM(``, { url, })
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

export function onCreated(test) {
	test.expect(10)
	const diary = new Diary()
	const binding = new DiaryBinding({ diary })
	rootBinding.run(DiaryModel, { binding })
	test.deepEqual(binding._children[0].model, RouterModel)
	test.ok(binding._children[0] instanceof RouterBinding)
	const router = binding._children[0].properties.router
	test.ok(router instanceof Router)
	test.strictEqual(router.type, Router.TYPE.VIRTUAL)
	test.strictEqual(router.routes[0].match, "/")
	test.deepEqual(router.routes[0].model, AuthViewModel)
	test.deepEqual(router.routes[0].binding, AuthViewBinding)
	test.strictEqual(router.routes[1].match, "/diary")
	test.deepEqual(router.routes[1].model, DiaryViewModel)
	test.deepEqual(router.routes[1].binding, DiaryViewBinding)
	test.done()
}

export function reset(test) {
	test.expect(1)
	const diary = new Diary()
	diary.firstRun = false
	const binding = new DiaryBinding({ diary })
	rootBinding.run(DiaryModel, { binding })
	diary.listen("logout", () => {
		test.strictEqual(diary.firstRun, true)
		test.done()
	})
	diary.emit("reset")
}

export function logout(test) {
	test.expect(3)
	const diary = new Diary()
	diary.notes.push(new Note("cxzcxz", new Date()))
	const binding = new DiaryBinding({ diary })
	rootBinding.run(DiaryModel, { binding })
	const router = binding._children[0].properties.router
	router.listen("browse", data => {
		test.strictEqual(data.path, "/")
		test.deepEqual(diary._notes, [])
		test.strictEqual(diary.password, null)
		test.done()
	})
	diary.emit("logout")
}
