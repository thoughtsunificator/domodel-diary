import { EventListener } from "domodel"

/**
 * @global
 */
class EditorEventListener extends EventListener {

	/**
	 * @param {Note} note
	 */
	open(note) {
		const { diary } = this.properties
		const { editor } = diary
		if(diary.editor.opened) {
			return
		}
		diary.editor.opened = true
		this.root.style.display = "grid"
		this.identifier.content.focus()
		if(note) {
			this.identifier.content.value = note.content
			diary.editor.note = note
		}
	}

	/**
	 *
	 */
	close() {
		const { diary } = this.properties
		const { editor } = diary
		this.root.style.display = "none"
		editor.note = null
		editor.opened = false
	}

}

export default EditorEventListener
