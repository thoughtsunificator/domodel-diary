import { Binding } from "domodel"
import { ItemBinding } from "@domodel/paginator"

import NoteEventListener from "./note.event.js"

/**
 * @global
 */
class NoteBinding extends ItemBinding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Day}    properties.day
	 * @param {Note}   properties.note
	 */
	constructor(properties) {
		super(properties, new NoteEventListener(properties.note))
	}

	onCreated() {

		super.onCreated()

		const { diary, day, note } = this.properties

		this.identifier.edit.addEventListener("click", () => diary.editor.emit("open", note))
		this.identifier.remove.addEventListener("click", () => diary.notes.emit("remove", note))

	}

}

export default NoteBinding
