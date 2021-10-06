import { EventListener } from "domodel"

import AuthViewBinding from "./view/auth.binding.js"

/**
 * @global
 */
class DiaryEventListener extends EventListener {

	/**
	 * @event DiaryEventListener#login
	 * @property {string} password
	 *
	*/

	/**
	 * @event DiaryEventListener#authSuccess
	 */
	authSuccess() {
		if(this.router.view.binding instanceof AuthViewBinding) {
			this.router.view.emit("success")
		}
	}

	/**
	 * @event DiaryEventListener#authFail
	 */
	authFail() {
		if(this.router.view.binding instanceof AuthViewBinding) {
			this.router.view.emit("fail")
		}
	}

	/**
	 * @event DiaryEventListener#reset
	 */
	reset() {
		const { diary } = this.properties
		diary.firstRun = true
		diary.emit("logout")
	}

	/**
	 * @event DiaryEventListener#logout
	 */
	logout() {
		const { diary } = this.properties
		diary.password = null
		diary.notes.clear()
		this.router.emit("browse", { path: "/" })
	}

}

export default DiaryEventListener
