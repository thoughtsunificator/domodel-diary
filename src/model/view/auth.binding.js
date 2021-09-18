import CryptoES from "crypto-es";
import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { diary, router } = this.properties

		if(diary.firstRun) {
			this.identifier.status.textContent = "Welcome. First, set your password.\nIt will be used to decrypt your notes."
		} else {
			this.identifier.status.textContent = "Welcome back."
		}

		this.listen(diary, "auth success", () => {
			diary.firstRun = false
			router.emit("browse", { path: "/diary" })
		})

		this.listen(diary, "auth fail", () => {
			this.identifier.status.textContent = "Authentication failed."
		})

		this.identifier.reset.addEventListener("click", (() => {
			this.identifier.confirmErase.style.visibility = ""
		}))

		this.identifier.erase.addEventListener("click", (() => diary.emit("reset")))

		this.identifier.cancelErase.addEventListener("click", (() => {
			this.identifier.confirmErase.style.visibility = "hidden"
		}))

		this.identifier.form.addEventListener("submit", event => {
			event.preventDefault()
			diary.emit("login", this.identifier.password.value)
		})

	}

	async onRendered() {
		this.identifier.password.focus()
	}

}
