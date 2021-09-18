import { Binding } from "domodel"

import DayModel from "./day.js"
import DayBinding from "./day.binding.js"

export default class extends Binding {

	onCreated() {
		const { diary, week } = this.properties

		this.listen(week, "remove", () => this.remove())

		for(const day of week.days) {
			this.run(DayModel(day), { binding: new DayBinding({ day }) })
		}
	}

}
