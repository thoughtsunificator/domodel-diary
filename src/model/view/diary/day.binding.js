import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { diary, day } = this.properties

		if(diary.getNotesByDate(day.date).length >= 1) {
			this.root.classList.add("content")
		}

		this.listen(day, "select", () => {
			this.root.classList.add("active")
		})

		this.listen(day, "unselect", () => {
			this.root.classList.remove("active")
		})

		this.listen(day, "notes added", () => {
			this.root.classList.add("content")
		})

		this.listen(day, "notes removed", () => {
			if(diary.getNotesByDate(day.date).length === 0) {
				this.root.classList.remove("content")
			}
		})

		this.root.addEventListener("click", () => diary.calendar.emit("set date", { date: day.date }))

	}

}
