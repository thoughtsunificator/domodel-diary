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
		this.render()
	}

	/**
	 *
	 */
	clear() {
		const { diary } = this.properties
		const { notes } = diary
		notes.notesListList.forEach(note => diary.notes.emit("remove", note))
	}

}

export default NotesEventListener
