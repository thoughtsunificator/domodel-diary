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
			identifier: "content"
		}
	]
})
