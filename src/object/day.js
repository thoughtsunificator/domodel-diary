/** @module day */

import { Observable } from "domodel"

/**
 * @memberof module:day
 */
class Day extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date) {
		super()
		this._date = date
	}

	/**
	 * @readonly
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

}

export default Day
