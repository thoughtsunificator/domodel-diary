import { EventListener } from "domodel"

/**
 * @global
 */
class DayEventListener extends EventListener {

	/**
	 * @param {boolean} toggle
	 */
	updateIndicator(toggle) {
		if(toggle) {
			this.root.classList.add("content")
		} else {
			this.root.classList.remove("content")
		}
	}

	/**
	 *
	 */
	select() {
		this.root.classList.add("active")
	}

	/**
	 *
	 */
	unselect() {
		this.root.classList.remove("active")
	}

}

export default DayEventListener
