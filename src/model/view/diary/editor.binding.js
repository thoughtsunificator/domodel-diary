import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { diary } = this.properties

		this.note = null
		this.opened = false

		this.listen(diary, "editor open", note => {
			if(this.opened) {
				return
			}
			this.opened = true
			this.root.style.display = "grid"
			this.identifier.content.focus()
			if(note) {
				this.identifier.content.value = note.content
				this.note = note
			}
		})

		this.listen(diary, "editor close", () => {
			this.root.style.display = "none"
			this.note = null
			this.opened = false
		})

		this.identifier.close.addEventListener("click", () => {
			if(this.note !== null) {
				this.identifier.content.value = ""
			}
			diary.emit("editor close")
		})

		this.identifier.save.addEventListener("click", () => {
			if(this.note !== null) {
				diary.emit("notes update", { note: this.note, form: { content: this.identifier.content.value } })
			} else {
				diary.emit("notes add", { form: { content: this.identifier.content.value } })
			}
			this.identifier.content.value = ""
			diary.emit("editor close")
		})

		this.root.ownerDocument.defaultView.addEventListener("keyup", event => {
			if(event.keyCode === 27 && this.opened) {
				diary.emit("editor close")
			}
		})

	}

}
