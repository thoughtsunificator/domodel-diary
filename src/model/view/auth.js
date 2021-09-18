export default data => ({
	tagName: "div",
	id: "auth",
	children: [
		{
			tagName: "form",
			identifier: "form",
			style: "display: grid; grid-gap: 25px",
			children: [
				{
					tagName: "div",
					identifier: "status"
				},
				{
					tagName: "label",
					textContent: "Password",
					children: [
						{
							tagName: "div",
							children: [
								{
									required: true,
									identifier: "password",
									type: "password",
									tagName: "input"
								}
							]
						}
					]
				},
				{
					tagName: "button",
					textContent: "Login"
				},
				{
					tagName: "div",
					style: "text-decoration: underline; color: #731f1f; cursor: pointer",
					type: "button",
					identifier: "reset",
					textContent: "Reset everything"
				}
			]
		},
		{
			tagName: "div",
			style: "position: fixed; visibility: hidden; display: grid; top: 0px; place-content: center;place-items: center;height: 100%;width: 100%; background-color: #000000b3;",
			identifier: "confirmErase",
			children: [
					{
						tagName: "div",
						style: "background-color: #5339338a; padding: 10px; display: grid; grid-gap: 5px;",
						children: [
						{
							tagName: "p",
							textContent: "You're going to lose all your data."
						},
						{
							tagName: "div",
							style: "display: grid; grid-auto-flow: column",
							children: [
								{
									tagName: "button",
									identifier: "cancelErase",
									textContent: "Cancel"
								},
								{
									tagName: "button",
									identifier: "erase",
									style: "color: #d0caca;background-color: #681f1f;",
									textContent: "Continue"
								}
							]
						}
					]
				}
			]
		}
	]
})
