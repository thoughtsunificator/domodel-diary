import { Observable } from "domodel"

import Note from "./note.js"

/**
 * @global
 */
class Notes extends Observable {

	constructor() {
		super()
		this._notesList = []
	}

	/**
	 * @param {string} content
	 * @param {Date}   date
	 */
	add(content, date) {
		const note = new Note(content, date)
		this.notesList.push(note)
		return note
	}

	/**
	 * @param {Note} note
	 */
	remove(note) {
		this.notesList.splice(this.notesList.indexOf(note), 1)
	}

	/**
	 * @return {Note[]}
	 */
	byDate(date) {
		return this.notesList.filter(note => note.date.getMonth() === date.getMonth() && note.date.getFullYear() === date.getFullYear() && note.date.getDate() === date.getDate())
	}

	/**
	 * @param {Note} note
	 * @param {object} data
	 */
	update(note, data) {
		for(const key in data) {
			note[key] = data[key]
		}
	}

	/**
	 *
	 */
	clear() {
		this._notesList = []
	}

	/**
	 * @type {Note[]}
	 */
	get notesList() {
		return this._notesList
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return JSON.stringify(this.notesList.map(note => ({
			content: note.content,
			date: note.date
		})))
	}

}

export default Notes
