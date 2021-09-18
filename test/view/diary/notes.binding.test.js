import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import Diary from "../../../src/object/diary.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("view/diary/notes", () => {

	beforeEach(() => {

		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })

	})

	afterEach(() => {

		rootBinding.remove()

	})

	it("instance", () => {

			assert.ok(new NotesBinding() instanceof Binding)

	})

	it("onCreated", () => {
		// const diary = new Diary()
		// const binding = new NotesBinding({ diary })
		// rootBinding.run(NotesModel, { binding })

	})

	it("render", () => {

	})

	it("itemsChanged", () => {

	})

	it("notesAdd", () => {

	})

	it("notesUpdate", () => {

	})

	it("notesRemove", () => {

	})

	it("dateUpdated", () => {

	})

	it("notesAdded", () => {

	})

	it("notesRemoved", () => {

	})

})
