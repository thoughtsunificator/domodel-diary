export default {
	tagName: "div",
	id: "notes",
	children: [
		{
			tagName: "div",
			identifier: "placeholder",
			textContent: "List is empty."
		},
		{
			tagName: "div",
			className: "grid-gap",
			style: "display: none",
			identifier: "list"
		}
	]
}
