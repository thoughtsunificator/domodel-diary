import assert from "assert"
import { Observable } from "domodel"

import Week from "../src/object/week.js"

describe("week", () => {

	it("instance", () => {

		const week = new Week(2)
		assert.ok(week instanceof Observable)
		assert.strictEqual(week.number, 2)
		assert.throws(() => {
			week.number = ""
			week.days = ""
		})

	})

})
