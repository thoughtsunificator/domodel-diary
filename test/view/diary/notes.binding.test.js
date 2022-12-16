import test from "ava"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"
import { Paginator, PaginatorBinding, PaginatorModel, Item } from "@domodel/paginator"

import NoteModel from "../../../src/model/view/diary/note.js"
import NoteBinding from "../../../src/model/view/diary/note.binding.js"
import NotesModel from "../../../src/model/view/diary/notes.js"

import NotesBinding from "../../../src/model/view/diary/notes.binding.js"

import Diary from "../../../src/object/diary.js"

const RootModel = { tagName: "div" }

test.beforeEach((test) => {
	test.context.virtualDOM = new JSDOM()
	test.context.window = test.context.virtualDOM.window
	test.context.document = test.context.window.document
	test.context.rootBinding = new Binding()
	Core.run(RootModel, { parentNode: test.context.document.body, binding: test.context.rootBinding })
})

test("NotesBinding instance", (test) => {
	test.true(NotesBinding.prototype instanceof Binding)
})

test("NotesBinding onCreated", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new NotesBinding({ diary })
			const notes = []
			notes.push(diary.notes.add("Test", new Date()))
			notes.push(diary.notes.add("xzczxcxcxzc", new Date()))
			binding.paginator.listen("itemsSet", data => {
				test.deepEqual(data, notes.slice().reverse().map(note => new Item(NoteModel, NoteBinding, { note })))
				resolve()
			})
			test.true(binding.paginator instanceof Paginator)
			test.context.rootBinding.run(NotesModel, { binding })
			test.deepEqual(binding._children[0].model, PaginatorModel)
			test.true(binding._children[0] instanceof PaginatorBinding)
		}),
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new NotesBinding({ diary })
			const notes = []
			diary.notes.add("432432", new Date(1995, 11, 17))
			notes.push(diary.notes.add("xzczxcxcxzc", new Date()))
			diary.notes.add("fsfds", new Date(1995, 11, 17))
			binding.paginator.listen("itemsSet", data => {
				test.deepEqual(data, notes.slice().reverse().map(note => new Item(NoteModel, NoteBinding, { note })))
				resolve()
			})
			test.true(binding.paginator instanceof Paginator)
			test.context.rootBinding.run(NotesModel, { binding })
			test.deepEqual(binding._children[0].model, PaginatorModel)
			test.true(binding._children[0] instanceof PaginatorBinding)
		})
	])
})

test("NotesBinding render", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new NotesBinding({ diary })
			test.context.rootBinding.run(NotesModel, { binding })
			const notes = []
			notes.push(diary.notes.add("Test", new Date()))
			notes.push(diary.notes.add("xzczxcxcxzc", new Date()))
			binding.paginator.listen("itemsSet", data => {
				test.deepEqual(data, notes.slice().reverse().map(note => new Item(NoteModel, NoteBinding, { note })))
				resolve()
			})
			binding.render()
		})		
	])
})

test("NotesBinding itemsChanged", (test) => {
	return Promise.all([
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new NotesBinding({ diary })
			binding.paginator.listen("itemsChanged", data => {
				test.is(binding.identifier.list.style.display, "none")
				test.is(binding.identifier.placeholder.style.display, "")
				resolve()
			})
			test.context.rootBinding.run(NotesModel, { binding })
		}),
		new Promise(resolve => {
			const diary = new Diary()
			const binding = new NotesBinding({ diary })
			test.context.rootBinding.run(NotesModel, { binding })
			diary.notes.add("xzczxcxcxzc", new Date())
			binding.paginator.listen("itemsChanged", data => {
				test.is(binding.identifier.list.style.display, "")
				test.is(binding.identifier.placeholder.style.display, "none")
				resolve()
			})
			binding.render()
		})		
	])
})

