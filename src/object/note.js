import { Observable } from "domodel"

/**
 * @global
 */
class Note extends Observable {

	/**
	 * @param  {string} content
	 * @param  {Date}   date
	 */
	constructor(content, date) {
		super()
		this._content = content
		this._date = date
	}

	/**
	 * @type {string}
	 */
	get content() {
		return this._content
	}

	set content(content) {
		this._content = content
	}

	/**
	 * @readonly
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

}

export default Note
