import { EventListener } from "domodel"

/**
 * @global
 */
class NoteEventListener extends EventListener {

	/**
	 * @event NoteEventListener#remove
	 */
	remove() {
		this.remove()
	}

	/**
	 * @event NoteEventListener#update
	 */
	update() {
		this.identifier.content.textContent = note.content
	}

}

export default NoteEventListener
