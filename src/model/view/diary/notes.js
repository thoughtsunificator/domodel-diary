export default {
	tagName: "div",
	id: "notes",
	children: [
		{
			tagName: "div",
			identifier: "placeholder",
			textContent: "That's where your notes should be."
		},
		{
			tagName: "div",
			className: "grid-gap",
			style: "display: none",
			identifier: "list"
		}
	]
}
