import CryptoES from "crypto-es"
import { Binding } from "domodel"
import { Popup, PopupModel } from "@domodel/popup"

import NotesModel from "./diary/notes.js"
import EditorModel from "./diary/editor.js"
import CalendarModel from "./diary/calendar.js"
import SettingsModel from "./diary/settings.js"

import CalendarBinding from "./diary/calendar.binding.js"
import EditorBinding from "./diary/editor.binding.js"
import NotesBinding from "./diary/notes.binding.js"
import SettingsBinding from "./diary/settings.binding.js"

import Diary from "../../object/diary.js"

export default class DiaryBinding extends Binding {

	static INACTIVITY_TIMER_DELAY = (60 * 1000) * 15

	startInactivityTimer() {
		this.interval = this.root.ownerDocument.defaultView.setInterval(() => this.properties.diary.emit("logout"), DiaryBinding.INACTIVITY_TIMER_DELAY)
	}

	stopInactivityTimer() {
		clearInterval(this.interval)
	}

	restartInactivityTimer() {
		this.stopInactivityTimer()
		this.startInactivityTimer()
	}

	onCreated() {

		const { diary } = this.properties

		this.textFileURL = null
		this.interval = null

		this.listen(diary, "export", () => {
			if (this.textFileURL !== null) {
				this.root.ownerDocument.defaultView.URL.revokeObjectURL(this.textFileURL)
			}
			const ciphertext = CryptoES.AES.encrypt(diary.toString(), diary.password).toString()
			const blob = new Blob( [ ciphertext ], {
				type: "text/plain"
			})
			const date = new Date()
			this.textFileURL = URL.createObjectURL( blob )
			const anchor = document.createElement("a")
			anchor.href = this.textFileURL
			anchor.download = `backup-domodel-diary-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.txt`
			anchor.click()
		})

		this.listen(diary, "import", () => {
			const inputFileNode = document.createElement("input")
			inputFileNode.type = "file"
			inputFileNode.style.display = "none"
			inputFileNode.addEventListener("input", (event) => {
				const reader = new FileReader()
				reader.addEventListener("load", () => {
					try {
						const bytes  = CryptoES.AES.decrypt(reader.result, diary.password)
						const decryptedData = JSON.parse(bytes.toString(CryptoES.enc.Utf8))
						diary.notes.forEach(note => diary.emit("notes remove", note))
						decryptedData.forEach(note => diary.addNote(note.content, new Date(note.date)))
						diary.emit("imported")
					} catch(ex)  {
						console.error(ex)
						alert("Unable to import this backup. It might be due to the current password not matching with the backup.")
					}
				})
				reader.addEventListener("error", () => alert("Error reading file"))
				reader.readAsText(event.target.files[0], "UTF-8")
				inputFileNode.remove()
			})
			inputFileNode.click()
		})

		this.listen(diary, "auth success", () => {
			this.identifier.navigation.style.display = "block"
			this.startInactivityTimer()
		})

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
			diary.emit("settings popup")
		})

		this.identifier.addNote.addEventListener("click", () => diary.emit("editor open"))

		this.run(CalendarModel, { parentNode: this.identifier.content, binding: new CalendarBinding() })
		this.run(NotesModel, { parentNode: this.identifier.content, binding: new NotesBinding() })
		this.run(EditorModel, { binding: new EditorBinding() })
		this.run(PopupModel(SettingsModel), { binding: new SettingsBinding({ popup: new Popup() }) })

	}

}
