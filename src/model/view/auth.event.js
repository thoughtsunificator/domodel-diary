import { EventListener } from "domodel"

/**
 * @global
 */
class AuthViewEventListener extends EventListener {

	/**
	 * @event AuthViewEventListener#success
	 */
	success() {
		this.properties.diary.firstRun = false
		this.properties.router.emit("browse", { path: "/diary" })
	}

	/**
	 * @event AuthViewEventListener#fail
	 */
	fail() {
		this.identifier.status.textContent = "Authentication failed."
	}

}

export default AuthViewEventListener
