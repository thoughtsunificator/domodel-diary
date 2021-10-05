import { Popup, PopupModel } from "@domodel/popup"

import NotesModel from "./diary/notes.js"
import EditorModel from "./diary/editor.js"
import CalendarModel from "./diary/calendar.js"
import SettingsModel from "./diary/settings.js"

import CalendarBinding from "./diary/calendar.binding.js"
import EditorBinding from "./diary/editor.binding.js"
import NotesBinding from "./diary/notes.binding.js"
import SettingsBinding from "./diary/settings.binding.js"

export default data => ({
	tagName: "div",
	id: "diary",
	children: [
		{
			tagName: "div",
			id: "navigation",
			identifier: "navigation",
			children: [
				{
					tagName: "button",
					identifier: "menu",
					title: "Menu",
					className: "menu",
					textContent: "⚙️",
				},

				{
					tagName: "button",
					identifier: "addNote",
					className: "add-note",
					title: "Add an entry",
					textContent: "📝"
				},
			]
		},
		{
			tagName: "div",
			className: "content",
			identifier: "content",
			children: [
				{
					model: CalendarModel,
					binding: CalendarBinding
				},
				{
					model: NotesModel,
					binding: NotesBinding
				}
			]
		},
		{
			model: EditorModel,
			binding: EditorBinding
		}
	]
})
