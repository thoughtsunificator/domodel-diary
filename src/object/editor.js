import { Observable } from "domodel"

/**
 * @global
 */
class Editor extends Observable {

	constructor() {
		super()
		this._opened = false
		this._note = null
	}

	/**
	 * @type {boolean}
	 */
	get opened() {
		return this._opened
	}

	set opened(opened) {
		this._opened = opened
	}

	/**
	 * @type {Note}
	 */
	get note() {
		return this._note
	}

	set note(note) {
		this._note = note
	}

}

export default Editor
