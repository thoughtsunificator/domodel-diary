import { EventListener } from "domodel"

import WeekModel from "./week.js"

import WeekBinding from "./week.binding.js"

import Week from "../../../object/week.js"
import Day from "../../../object/day.js"
import Calendar from "../../../object/calendar.js"

/**
 * @global
 */
class CalendarEventListener extends EventListener {

	/**
	 * @event CalendarEventListener#setDate
	 * @property {object}  data
	 * @property {Date}    data.date
	 * @property {boolean} data.rebuild
	 * @example calendar.emit("setDate", { date: new Date() })
	 */
	setDate(data) {
		const { diary } = this.properties
		const { calendar } = diary

		const date = new Date(data.date)

		this.identifier.date.textContent = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
		this.identifier.month.selectedIndex = date.getMonth()
		this.identifier.year.value = date.getFullYear()

		if(calendar.date.getMonth() !== date.getMonth() || calendar.date.getFullYear() !== date.getFullYear()
				|| calendar.weeks === null || data.rebuild) {
			if(calendar.weeks !== null) {
				calendar.weeks.forEach(week => week.emit("remove"))
			}
			calendar.weeks = []
			const daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
			const firstDay = new Date(date.getFullYear(), date.getMonth())
			const days = [...Array(daysCount).keys()]
			let week = new Week(1)
			for(let i =firstDay.getDay(); i > 0;i--) {
				const previousMonthDate = new Date(date)
				previousMonthDate.setMonth(date.getMonth() - 1)
				const previousMonthDaysCount = new Date(previousMonthDate.getFullYear(), previousMonthDate.getMonth() + 1, 0).getDate()
				previousMonthDate.setDate(previousMonthDaysCount - i + 1)
				week.days.push(new Day(previousMonthDate, true))
			}
			for(let i = 1; i < days.length + 1; i++) {
				const dayDate = new Date(date)
				dayDate.setDate(i)
				week.days.push(new Day(dayDate))
				if(week.days.length === 7 || i === days.length) {
					calendar.weeks.push(week)
					week = new Week(week.number + 1)
				}
			}
			for(const week of calendar.weeks) {
				this.run(WeekModel, { parentNode: this.identifier.body, binding: new WeekBinding({ week }) })
			}
		} else {
			if(calendar.weeks !== null) {
				calendar.weeks.map(week => week.days).flat().forEach(day => day.emit("unselect"))
			}
		}
		const previousDate = calendar.date
		calendar.date = date
		calendar.day = calendar.weeks.map(week => week.days).flat().find(day => day.date.getDate() === date.getDate() && day.date.getMonth() === date.getMonth())
		calendar.day.emit("select")
	}

	/**
	 * @event CalendarEventListener#setMonth
	 * @property {number} month
	 */
	setMonth(month) {
		const { diary } = this.properties
		const { calendar } = diary

		const date = new Date(calendar.date)
		if(month > this.identifier.month.options.length - 1) {
			month = 0
			this.identifier.month.selectedIndex = month
			date.setYear(parseInt(this.identifier.year.value) + 1)
		} else if(month < 0) {
			month = this.identifier.month.options.length - 1
			this.identifier.month.selectedIndex = month
			date.setYear(this.identifier.year.value - 1)
		}
		date.setDate(1)
		date.setMonth(month)
		calendar.emit("setDate", { date })
	}

	/**
	 * @event CalendarEventListener#setYear
	 * @property {number} year
	 */
	setYear(year) {
		const { diary } = this.properties
		const { calendar } = diary

		const date = new Date(calendar.date)
		date.setYear(year)
		calendar.emit("setDate", { date })
	}

}

export default CalendarEventListener
