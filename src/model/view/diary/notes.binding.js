import { Binding } from "domodel"
import { Paginator, Item, PaginatorModel, PaginatorBinding } from "@domodel/paginator"

import NoteModel from "./note.js"

import NoteBinding from "./note.binding.js"

import NotesEventListener from "./notes.event.js"

/**
 * @global
 */
class NotesBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 */
	constructor(properties) {
		super(properties, new NotesEventListener(properties.diary.notes))
		this.paginator = new Paginator(3)
	}

	onCreated() {

		const { diary } = this.properties

		this.listen(this.paginator, "itemsChanged", () => {
			if(this.paginator.items.length === 0) {
				this.identifier.list.style.display = "none"
				this.identifier.placeholder.style.display = ""
			} else {
				this.identifier.list.style.display = ""
				this.identifier.placeholder.style.display = "none"
			}
		})

		this.listen(diary.calendar, "setDate", () => this.render())

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator
			})
		})

		this.render()

	}

	/**
	 *
	 */
	render() {
		const notes = this.properties.diary.notes.byDate(this.properties.diary.calendar.date).slice().sort(((a, b) => a.date - b.date))
		this.paginator.emit("itemsSet", notes.slice().reverse().map((note => new Item(NoteModel, NoteBinding, { note }))))
	}

}

export default NotesBinding
