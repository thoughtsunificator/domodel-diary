import { Observable } from "domodel"

import Day from "../src/object/day.js"

export function instance(test) {
	test.expect(3)
	const date = new Date()
	const day = new Day(date)
	test.ok(day instanceof Observable)
	test.strictEqual(day.date, date)
	test.throws(function() {
		day.date = new Date()
	})
	test.done()
}
