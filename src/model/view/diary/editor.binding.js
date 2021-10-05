import { Binding } from "domodel"

import EditorEventListener from "./editor.event.js"

/**
 * @global
 */
class EditorBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 */
	constructor(properties) {
		super(properties, new EditorEventListener(properties.diary.editor))
	}

	onCreated() {

		const { diary } = this.properties
		const { editor } = diary

		this.identifier.close.addEventListener("click", () => {
			if(editor.note !== null) {
				this.identifier.content.value = ""
			}
			editor.emit("close")
		})

		this.identifier.save.addEventListener("click", () => {
			if(editor.note !== null) {
				diary.notes.emit("update", { note: editor.note, form: { content: this.identifier.content.value } })
			} else {
				diary.notes.emit("add", { form: { content: this.identifier.content.value } })
			}
			this.identifier.content.value = ""
			editor.emit("close")
		})

		this.root.ownerDocument.defaultView.addEventListener("keyup", event => {
			if(event.keyCode === 27 && editor.opened) {
				editor.emit("close")
			}
		})

	}

}

export default EditorBinding
