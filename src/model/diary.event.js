import { EventListener } from "domodel"

import AuthViewBinding from "./view/auth.binding.js"

/**
 * @global
 */
class DiaryEventListener extends EventListener {

	/**
	 * @name login
	 * @memberOf AuthViewEventListener
	 * @function
	 * @param {string} password
	 *
	*/

	/**
	 *
	 */
	authSuccess() {
		if(this.router.view.binding instanceof AuthViewBinding) {
			this.router.view.emit("success")
		}
	}

	/**
	 *
	 */
	authFail() {
		if(this.router.view.binding instanceof AuthViewBinding) {
			this.router.view.emit("fail")
		}
	}

	/**
	 *
	 */
	reset() {
		const { diary } = this.properties
		diary.firstRun = true
		diary.emit("logout")
	}

	/**
	 *
	 */
	logout() {
		const { diary } = this.properties
		diary.password = null
		diary.notes.clear()
		this.router.emit("browse", { path: "/" })
	}

}

export default DiaryEventListener
