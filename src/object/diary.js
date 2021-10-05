import { Observable } from "domodel"

import Calendar from "./calendar.js"
import Editor from "./editor.js"
import Notes from "./notes.js"
import Note from "./note.js"

/**
 * @global
 */
class Diary extends Observable {

	/**
	 * @param {Date} date
	 */
	constructor(date = new Date()) {
		super()
		this._calendar = new Calendar(date)
		this._editor = new Editor()
		this._password = null
		this._notes = new Notes()
		this._firstRun = true
	}

	/**
	 * @readonly
	 * @type {Calendar}
	 */
	get calendar() {
		return this._calendar
	}

	/**
	 * @readonly
	 * @type {Editor}
	 */
	get editor() {
		return this._editor
	}

	/**
	 * @readonly
	 * @type {Notes}
	 */
	get notes() {
		return this._notes
	}

	/**
	 * @type {string}
	 */
	get password() {
		return this._password
	}

	set password(password) {
		this._password = password
	}

	/**
	 * @type {boolean}
	 */
	get firstRun() {
		return this._firstRun
	}

	set firstRun(firstRun) {
		this._firstRun = firstRun
	}

}

export default Diary
