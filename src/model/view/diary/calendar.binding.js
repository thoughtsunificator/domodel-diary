import { Binding } from "domodel"

import CalendarEventListener from "./calendar.event.js"

/**
 * @global
 */
class CalendarBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 */
	constructor(properties) {
		super(properties, new CalendarEventListener(properties.diary.calendar))
	}

	onCreated() {

		const { diary } = this.properties

		const { calendar } = diary

		this.listen(diary, "imported", () => {
			calendar.emit("setDate", { date: calendar.date, rebuild: true })
		})

		this.identifier.today.addEventListener("click", event => calendar.emit("setDate", { date: new Date() }))
		this.identifier.month.addEventListener("change", event => calendar.emit("setMonth", event.target.selectedIndex))
		this.identifier.previousMonth.addEventListener("click", () => calendar.emit("setMonth", this.identifier.month.selectedIndex - 1))
		this.identifier.nextMonth.addEventListener("click", () => calendar.emit("setMonth", this.identifier.month.selectedIndex + 1))
		this.identifier.year.addEventListener("input", event => calendar.emit("setYear", event.target.value))

		calendar.emit("setDate", { date: calendar.date, rebuild: true })

	}

}

export default CalendarBinding
