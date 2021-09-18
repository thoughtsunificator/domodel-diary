/** @module diary */

import { Observable } from "domodel"

import Calendar from "./calendar.js"
import Note from "./note.js"

/**
 * @memberof module:diary
 */
class Diary extends Observable {

	constructor(date = new Date()) {
		super()
		this._calendar = new Calendar(date)
		this._password = null
		this._notes = []
		this._firstRun = true
	}

	/**
	 * @param {string} content
	 * @param {Date}   date
	 */
	addNote(content, date) {
		const note = new Note(content, date)
		this.notes.push(note)
		return note
	}

	/**
	 * @return {Note[]}
	 */
	getNotesByDate(date) {
		return this.notes.filter(note => note.date.getMonth() === date.getMonth() && note.date.getFullYear() === date.getFullYear() && note.date.getDate() === date.getDate())
	}

	/**
	 * @param {Note} note
	 */
	removeNote(note) {
		this.notes.splice(this.notes.indexOf(note), 1)
	}

	/**
	 * @param {Note} note
	 * @param {object} data
	 */
	updateNote(note, data) {
		for(const key in data) {
			note[key] = data[key]
		}
	}

	clearNotes() {
		this._notes = []
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return JSON.stringify(this.notes.map(note => ({
			content: note.content,
			date: note.date
		})))
	}

	/**
	 * @type {Calendar}
	 */
	get calendar() {
		return this._calendar
	}

	set calendar(calendar) {
		this._calendar = calendar
	}

	/**
	 * @readonly
	 * @type {Note[]}
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
