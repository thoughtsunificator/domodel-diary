export default {
	tagName: "div",
	className: "editor",
	children: [
		{
			tagName: "button",
			identifier: "close",
			className: "close",
			title: "Close",
			textContent: "❌"
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					children: [
						{
							tagName: "div",
							style: "width: 100%; height:100%;",
							children: [
								{
									tagName: "textarea",
									identifier: "content"
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "button",
			className: "save",
			identifier: "save",
			title: "Save",
			tabIndex: 0,
			textContent: "💾"
		},
	]
}
