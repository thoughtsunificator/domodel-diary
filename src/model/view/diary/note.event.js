import { EventListener } from "domodel"

/**
 * @global
 */
class NoteEventListener extends EventListener {

	/**
	 *
	 */
	remove() {
		this.remove()
	}

	/**
	 *
	 */
	update() {
		this.identifier.content.textContent = note.content
	}

}

export default NoteEventListener
