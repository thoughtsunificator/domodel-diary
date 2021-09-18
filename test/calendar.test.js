import { Observable } from "domodel"

import Calendar from "../src/object/calendar.js"

export function instance(test) {
	test.expect(5)
	const date = new Date()
	const calendar = new Calendar(date)
	test.ok(calendar instanceof Observable)
	test.strictEqual(calendar.date, date)
	test.strictEqual(calendar.weeks, null)
	test.strictEqual(calendar.day, null)
	test.doesNotThrow(function() {
		calendar.weeks = []
		calendar.day = ""
		calendar.date = new Date()
	})
	test.done()
}
