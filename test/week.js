import { Observable } from "domodel"

import Week from "../src/object/week.js"

export function instance(test) {
	test.expect(3)
	const week = new Week(2)
	test.ok(week instanceof Observable)
	test.strictEqual(week.number, 2)
	test.throws(() => {
		week.number = ""
		week.days = ""
	})
	test.done()
}
