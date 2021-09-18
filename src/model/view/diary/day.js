export default data => ({
	tagName: "td",
	className: `day ${data.date.getMonth() === new Date().getMonth() && data.date.getDate() === new Date().getDate() && data.date.getFullYear() === new Date().getFullYear() ? 'current' : '' }`,
	textContent: data.date.getDate()
})
