export function createElement(options) {
	const { tag = 'div', text = '', children = [], classes = [] } = options;
	const element = document.createElement(tag);
	element.textContent = text;
	const filteredClasses = classes.filter((cls) => cls && cls.trim());
	if (filteredClasses.length > 0) {
		element.classList.add(...filteredClasses);
	}
	element.append(...children);
	return element;
}
