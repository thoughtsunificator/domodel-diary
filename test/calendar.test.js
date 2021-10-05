import assert from "assert"
import { Observable } from "domodel"

import Calendar from "../src/object/calendar.js"

describe("calendar", () => {

	it("instance", () => {
		const date = new Date()
		const calendar = new Calendar(date)
		assert.ok(Calendar.prototype instanceof Observable)
		assert.strictEqual(calendar.date, date)
		assert.strictEqual(calendar.weeks, null)
		assert.strictEqual(calendar.day, null)
		assert.doesNotThrow(function() {
			calendar.weeks = []
			calendar.day = ""
			calendar.date = new Date()
		})
	})

})
