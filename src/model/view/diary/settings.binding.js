import { Binding } from "domodel"
import { PopupBinding } from "@domodel/popup"

export default class extends PopupBinding {

	onCreated() {

		super.onCreated()

		const { diary, popup } = this.properties

		this.listen(diary, "settings popup", (() => {
			popup.emit("show")
		}))

		this.identifier.export.addEventListener("click", (() => diary.emit("export")))
		this.identifier.import.addEventListener("click", (() => diary.emit("import")))
		this.identifier.logout.addEventListener("click", (() => diary.emit("logout")))

	}

}
