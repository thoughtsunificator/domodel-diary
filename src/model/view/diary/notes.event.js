import { EventListener } from "domodel"

/**
 * @global
 */
class NotesEventListener extends EventListener {

	/**
	 * @param {object} data
	 * @param {object} data.form
	 * @param {string} data.form.content
	 */
	add(data) {
		const { diary } = this.properties
		const { calendar, notes } = diary
		const { form } = data
		const note = notes.add(form.content, calendar.day.date)
		diary.calendar.day.emit("updateIndicator", true)
		this.render()
	}

	/**
	 * @param {object} data
	 * @param {Note}   date.note
	 * @param {object} data.form
	 * @param {string} data.form.content
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
	 * @param {Note} note
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
	 *
	 */
	clear() {
		const { diary } = this.properties
		const { notes } = diary
		notes.notesList.forEach(note => diary.notes.emit("remove", note))
	}

}

export default NotesEventListener
