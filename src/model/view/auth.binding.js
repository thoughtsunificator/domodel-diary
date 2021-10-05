import CryptoES from "crypto-es";
import { Binding } from "domodel"

import AuthViewEventListener from "./auth.event.js"

/**
 * @global
 */
class AuthViewBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Router} properties.router
	 */
	constructor(properties) {
		super(properties, new AuthViewEventListener(properties.router.view))
	}

	onCreated() {

		const { diary } = this.properties

		if(diary.firstRun) {
			this.identifier.status.textContent = "Welcome. First, set your password.\nIt will be used to decrypt your notes."
		} else {
			this.identifier.status.textContent = "Welcome back."
		}

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

export default AuthViewBinding
