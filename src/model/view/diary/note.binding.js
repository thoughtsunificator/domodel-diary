import { Binding } from "domodel"
import { ItemBinding } from "@domodel/paginator"

export default class extends ItemBinding {

	onCreated() {

		super.onCreated()

		const { diary, day, note } = this.properties

		this.listen(note, "remove", () => this.remove())

		this.listen(note, "update", () => {
			this.identifier.content.textContent = note.content
		})

		this.identifier.edit.addEventListener("click", () => diary.emit("editor open", note))
		this.identifier.remove.addEventListener("click", () => diary.emit("notes remove", note))

	}

}
