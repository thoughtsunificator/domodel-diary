import CryptoES from "crypto-es";
import { EventListener } from "domodel"

/**
 * @global
 */
class DiaryViewEventListener extends EventListener {

	/**
	 * @name exported
	 * @memberOf DiaryViewEventListener
	 * @function
	 *
	*/

	/**
	 * @name imported
	 * @memberOf DiaryViewEventListener
	 * @function
	 *
	*/

	/**
	 *
	 */
	export() {
		const { diary } = this.properties
		if (this.textFileURL !== null) {
			this.root.ownerDocument.defaultView.URL.revokeObjectURL(this.textFileURL)
		}
		const ciphertext = CryptoES.AES.encrypt(diary.notes.toString(), diary.password).toString()
		const blob = new Blob( [ ciphertext ], {
			type: "text/plain"
		})
		const date = new Date()
		this.textFileURL = URL.createObjectURL( blob )
		const anchor = document.createElement("a")
		anchor.href = this.textFileURL
		anchor.download = `backup-domodel-diary-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.txt`
		anchor.click()
		diary.emit("exported")
	}

	/**
	 *
	 */
	import() {
		const { diary } = this.properties
		const inputFileNode = document.createElement("input")
		inputFileNode.type = "file"
		inputFileNode.style.display = "none"
		inputFileNode.addEventListener("input", (event) => {
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				try {
					const bytes = CryptoES.AES.decrypt(reader.result, diary.password)
					const decryptedData = JSON.parse(bytes.toString(CryptoES.enc.Utf8))
					diary.notes.emit("clear")
					decryptedData.forEach(note => diary.notes.add(note.content, new Date(note.date)))
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
	}

	/**
	 *
	 */
	openSettings() {
		this.popup.emit("show")
	}

}

export default DiaryViewEventListener
