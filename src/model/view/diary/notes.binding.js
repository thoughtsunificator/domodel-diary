import { Binding } from "domodel"
import { Paginator, Item, PaginatorModel, PaginatorBinding } from "@domodel/paginator"

import NoteModel from "./note.js"

import NoteBinding from "./note.binding.js"

export default class extends Binding {

	render() {
		const notes = this.properties.diary.getNotesByDate(this.properties.diary.calendar.date).slice().sort(((a, b) => a.date - b.date))
		this.paginator.emit("items set", notes.slice().reverse().map((note => new Item(NoteModel, NoteBinding, { note }))))
	}

	onCreated() {

		const { diary } = this.properties

		this.paginator = new Paginator(3)

		this.listen(this.paginator, "items changed", () => {
			if(this.paginator.items.length === 0) {
				this.identifier.list.style.display = "none"
				this.identifier.placeholder.style.display = ""
			} else {
				this.identifier.list.style.display = ""
				this.identifier.placeholder.style.display = "none"
			}
		})

		this.listen(diary, "notes add", data => {
			const note = diary.addNote(data.form.content, diary.calendar.day.date);
			diary.calendar.day.emit("notes added")
			diary.emit("notes added", note)
		})

		this.listen(diary, "notes update", data => {
			diary.updateNote(data.note, data.form)
			data.note.emit("update")
			diary.emit("notes updated", data.note)
		})

		this.listen(diary, "notes remove", note => {
			diary.removeNote(note)
			note.emit("remove")
			diary.calendar.day.emit("notes removed")
			diary.emit("notes removed", note)
		})

		this.listen(diary, "date updated", () => this.render())

		this.listen(diary, "notes added", () => this.render())

		this.listen(diary, "notes removed", () => this.render())

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator
			})
		})

		this.render()

	}
}
