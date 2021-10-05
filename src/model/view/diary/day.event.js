import { EventListener } from "domodel"

/**
 * @global
 */
class DayEventListener extends EventListener {

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
