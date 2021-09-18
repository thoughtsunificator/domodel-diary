import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import WeekModel from "../../../src/model/view/diary/week.js"

import WeekBinding from "../../../src/model/view/diary/week.binding.js"

import Diary from "../../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("view/diary/week", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

			assert.ok(new WeekBinding() instanceof Binding)

	})

	it("onCreated", () => {

		// const diary = new Diary()
		// const binding = new WeekBinding({ diary })
		// rootBinding.run(WeekModel, { binding })

	})

	it("remove", () => {

	})

})
