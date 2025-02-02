export function createElement(options) {
	const {
		tag = 'div',
		id = '',
		text = '',
		children = [],
		classes = [],
		disabled = false,
	} = options;
	const element = document.createElement(tag);
	element.textContent = text;
	element.id = id;
	if (classes.length > 0) {
		element.classList.add(...classes);
	}
	if (disabled) {
		element.disabled = true;
	}
	element.append(...children);
	return element;
}
