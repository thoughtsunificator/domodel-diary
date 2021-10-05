import { EventListener } from "domodel"

/**
 * @global
 */
class AuthViewEventListener extends EventListener {


	/**
	 *
	 */
	success() {
		this.properties.diary.firstRun = false
		this.properties.router.emit("browse", { path: "/diary" })
	}

	/**
	 *
	 */
	fail() {
		this.identifier.status.textContent = "Authentication failed."
	}

}

export default AuthViewEventListener
