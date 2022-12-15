import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"
import { ItemBinding, Page } from "@domodel/paginator"

import NoteModel from "../../../src/model/view/diary/note.js"

import NoteBinding from "../../../src/model/view/diary/note.binding.js"

import NoteEventListener from "../../../src/model/view/diary/note.event.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"


const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("NoteEventListener instance", (test) => {
	test.true(NoteEventListener.prototype instanceof EventListener)
})

test("NoteEventListener remove", (test) => {
	test.pass()
})

test("NoteEventListener update", (test) => {
	test.pass()
})

