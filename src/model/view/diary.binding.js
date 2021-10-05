import CryptoES from "crypto-es"
import { Binding } from "domodel"
import { PopupModel, PopupBinding, Popup } from "@domodel/popup"

import SettingsModel from "./diary/settings.js"

import SettingsBinding from "./diary/settings.binding.js"

import DiaryViewEventListener from "./diary.event.js"

import Diary from "../../object/diary.js"

/**
 * @global
 */
class DiaryViewBinding extends Binding {

	/**
	 * @readonly
	 * @type {number}
	 */
	static INACTIVITY_TIMER_DELAY = (60 * 1000) * 15

	/**
	 * @param {object} properties
	 * @param {Diary}  properties.diary
	 * @param {Router} properties.router
	 */
	constructor(properties) {
		super(properties, new DiaryViewEventListener(properties.router.view))
	}

	onCreated() {

		const { diary } = this.properties

		this.popup = new Popup()
		this.textFileURL = null
		this.interval = null

		this.listen(diary, "logout", () => {
			this.stopInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("click", () => {
			this.restartInactivityTimer()
		})

		this.root.ownerDocument.defaultView.addEventListener("input", () => {
			this.restartInactivityTimer()
		})

		this.identifier.menu.addEventListener("click", () => {
			diary.emit("openSettings")
		})

		this.identifier.addNote.addEventListener("click", () => diary.editor.emit("open"))

		this.startInactivityTimer()

		this.run(PopupModel(SettingsModel), { binding: new SettingsBinding({ popup: this.popup  }) })
	}

	startInactivityTimer() {
		this.interval = this.root.ownerDocument.defaultView.setInterval(() => this.properties.diary.emit("logout"), DiaryViewBinding.INACTIVITY_TIMER_DELAY)
	}

	stopInactivityTimer() {
		clearInterval(this.interval)
	}

	restartInactivityTimer() {
		this.stopInactivityTimer()
		this.startInactivityTimer()
	}

}

export default DiaryViewBinding
