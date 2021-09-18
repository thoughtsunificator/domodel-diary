import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { ItemBinding, Page } from "@domodel/paginator"

import NoteModel from "../../../src/model/view/diary/note.js"

import NoteBinding from "../../../src/model/view/diary/note.binding.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("view/diary/note", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

			assert.ok(new NoteBinding() instanceof ItemBinding)

	})

	it("onCreated", () => {

		const diary = new Diary()
		const day = new Day(new Date())
		const page = new Page()
		const note = new Note("test", new Date())
		const binding = new NoteBinding({ note, diary, day, page })
		rootBinding.run(NoteModel({ note }), { binding })

	})

	it("remove", () => {

	})

	it("update", () => {

	})

	it("editButton", () => {

	})

	it("removeButton", () => {

	})

})
