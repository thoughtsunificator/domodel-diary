import assert from "assert"
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

describe("diary", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

		assert.ok(new DiaryBinding() instanceof Binding)

	})

	it("onCreated", () => {

		const diary = new Diary()
		const binding = new DiaryBinding({ diary })
		rootBinding.run(DiaryModel, { binding })
		assert.deepEqual(binding._children[0].model, RouterModel)
		assert.ok(binding._children[0] instanceof RouterBinding)
		const router = binding._children[0].properties.router
		assert.ok(router instanceof Router)
		assert.strictEqual(router.type, Router.TYPE.VIRTUAL)
		assert.strictEqual(router.routes[0].match, "/")
		assert.deepEqual(router.routes[0].model, AuthViewModel)
		assert.deepEqual(router.routes[0].binding, AuthViewBinding)
		assert.strictEqual(router.routes[1].match, "/diary")
		assert.deepEqual(router.routes[1].model, DiaryViewModel)
		assert.deepEqual(router.routes[1].binding, DiaryViewBinding)

	})

	it("reset", () => {

		const diary = new Diary()
		diary.firstRun = false
		const binding = new DiaryBinding({ diary })
		rootBinding.run(DiaryModel, { binding })
		diary.listen("logout", () => {
			assert.strictEqual(diary.firstRun, true)

		})
		diary.emit("reset")

	})

	it("logout", () => {

		const diary = new Diary()
		diary.notes.push(new Note("cxzcxz", new Date()))
		const binding = new DiaryBinding({ diary })
		rootBinding.run(DiaryModel, { binding })
		const router = binding._children[0].properties.router
		router.listen("browse", data => {
			assert.strictEqual(data.path, "/")
			assert.deepEqual(diary._notes, [])
			assert.strictEqual(diary.password, null)

		})
		diary.emit("logout")

	})

})
