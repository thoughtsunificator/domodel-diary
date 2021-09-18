import assert from "assert"
import { Observable } from "domodel"

import Day from "../src/object/day.js"

describe("day", () => {

	it("instance", () => {

		const date = new Date()
		const day = new Day(date)
		assert.ok(day instanceof Observable)
		assert.strictEqual(day.date, date)
		assert.throws(function() {
			day.date = new Date()
		})

	})

})
