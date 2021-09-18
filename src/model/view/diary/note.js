export default data => ({
	tagName: "div",
	className: "note",
	children: [
		{
			tagName: "p",
			className: "content",
			identifier: "content",
			textContent: data.note.content
		},
		{
			tagName: "div",
			className: "actions",
			children: [
				{
						tagName: "button",
						textContent: "✏️",
						className: "edit",
						identifier: "edit"
				},
				{
						tagName: "button",
						textContent: "🗑️",
						className: "remove",
						identifier: "remove"
				}
			]
		}
	]
})
