import { EventListener } from "domodel"

/**
 * @memberof: main
 */
class DiaryEventListener extends EventListener {

	reset() {
		diary.firstRun = true
		diary.emit("logout")
	}

	logout() {
		diary.password = null
		diary.clearNotes()
		router.emit("browse", { path: "/" })
	}

}

export default DiaryEventListener
