import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"
import { Router, RouterModel, RouterBinding } from "@domodel/router"

import DiaryModel from "../src/model/diary.js"

import DiaryBinding from "../src/model/diary.binding.js"

import DiaryEventListener from "../src/model/diary.event.js"

import Diary from "../src/object/diary.js"
import Note from "../src/object/note.js"

const url = "https://localhost/"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("DiaryEventListener instance", (test) => {
	test.true(DiaryEventListener.prototype instanceof EventListener)
})

test("DiaryEventListener authSuccess", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new DiaryBinding({ diary })
		test.context.rootBinding.run(DiaryModel, { binding })
		binding.router.view.listen("success", () => {
			test.pass()
			resolve()
		})
		diary.emit("authSuccess")
	})
})

test("DiaryEventListener authFail", test => {
	return new Promise(resolve => {
		const diary = new Diary()
		const binding = new DiaryBinding({ diary })
		test.context.rootBinding.run(DiaryModel, { binding })
		binding.router.emit("browse", { path: "/" })
		binding.router.view.listen("fail", () => {
			test.pass()
			resolve()
		})
		diary.emit("authFail")
	})
})

test("DiaryEventListener reset", (test) => {
	const diary = new Diary()
	diary.firstRun = false
	const binding = new DiaryBinding({ diary })
	test.context.rootBinding.run(DiaryModel, { binding })
	binding.listen(diary, "logout", () => {
		test.is(diary.firstRun, true)
	})
	diary.emit("reset")
})

test("DiaryEventListener logout", (test) => {
	const diary = new Diary()
	diary.notes.add("cxzcxz", new Date())
	const binding = new DiaryBinding({ diary })
	test.context.rootBinding.run(DiaryModel, { binding })
	const router = binding._children[0].properties.router
	binding.listen(router, "browse", data => {
		test.is(data.path, "/")
		test.deepEqual(diary.notes.notesList, [])
		test.is(diary.password, null)
	})
	diary.emit("logout")
})

