import { EventListener } from "domodel"

/**
 * @global
 */
class NotesEventListener extends EventListener {

	/**
	 * @event NotesEventListener#add
	 * @property {object} data
	 * @property {object} data.form
	 * @property {string} data.form.content
	 */
	add(data) {
		const { diary } = this.properties
		const { calendar, notes } = diary
		const { form } = data
		notes.add(form.content, calendar.day.date)
		diary.calendar.day.emit("updateIndicator", true)
		this.render()
	}

	/**
	 * @event NotesEventListener#update
	 * @property {object} data
	 * @property {Note}   date.note
	 * @property {object} data.form
	 * @property {string} data.form.content
	 */
	update(data) {
		const { diary } = this.properties
		const { notes } = diary
		const { note, form } = data
		notes.update(note, form)
		note.emit("update")
		this.render()
	}

	/**
	 * @event NotesEventListener#remove
	 * @property {Note} note
	 */
	remove(note) {
		const { diary } = this.properties
		const { notes } = diary
		notes.remove(note)
		note.emit("remove")
		diary.calendar.day.emit("updateIndicator", diary.notes.length >= 1)
		this.render()
	}

	/**
	 * @event NotesEventListener#clear
	 */
	clear() {
		const { diary } = this.properties
		const { notes } = diary
		notes.notesList.forEach(note => diary.notes.emit("remove", note))
	}

}

export default NotesEventListener
