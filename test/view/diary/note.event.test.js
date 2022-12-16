import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding, EventListener } from "domodel"
import { Page } from "@domodel/paginator"

import NoteEventListener from "../../../src/model/view/diary/note.event.js"

import Diary from "../../../src/object/diary.js"
import Day from "../../../src/object/day.js"
import Note from "../../../src/object/note.js"
import NoteModel from "../../../src/model/view/diary/note.js"
import NoteBinding from "../../../src/model/view/diary/note.binding.js"

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
	const diary = new Diary()
	const day = new Day(new Date())
	const page = new Page()
	const note = new Note("test", new Date())
	const binding = new NoteBinding({ note, diary, day, page })
	test.context.rootBinding.run(NoteModel({ note }), { binding })
	test.is(test.context.rootBinding.root.children.length, 1)
	note.emit("remove")
	setTimeout(() => {
		test.is(test.context.rootBinding.root.children.length, 0)
	})
})

test("NoteEventListener update", (test) => {
	const diary = new Diary()
	const day = new Day(new Date())
	const page = new Page()
	const note = new Note("test", new Date())
	const binding = new NoteBinding({ note, diary, day, page })
	test.context.rootBinding.run(NoteModel({ note }), { binding })
	test.is(binding.identifier.content.textContent, "test")
	note.content = "dsajdisaiuhdsoiad"
	note.emit("update")
	setTimeout(() => {
		test.is(binding.identifier.content.textContent, "dsajdisaiuhdsoiad")
	})
})

