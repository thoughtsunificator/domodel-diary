import { Binding } from "domodel"

import DayEventListener from "./day.event.js"

/**
 * @global
 */
class DayBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Day}    properties.day
	 */
	constructor(properties) {
		super(properties, new DayEventListener(properties.day))
	}

	onCreated() {

		const { diary, day } = this.properties

		if(diary.notes.byDate(day.date).length >= 1) {
			this.root.classList.add("content")
		}

		this.listen(diary.notes, "add", () => {
			this.root.classList.add("content")
		})

		this.listen(diary.notes, "remove", () => {
			if(diary.notes.byDate(day.date).length === 0) {
				this.root.classList.remove("content")
			}
		})

		this.root.addEventListener("click", () => diary.calendar.emit("setDate", { date: day.date }))

	}

}

export default DayBinding
