import { createElement } from '../utilits/createElem';

export function createGameControlMenu() {
	const controlAppItemsArr = [
		'Menu',
		'Show Solution',
		'Save Game',
		'Reset Game',
	];
	const controlApp = createElement({ tag: 'div', classes: ['app-control'] });
	const controlAppItems = createElement({
		tag: 'div',
		classes: ['app-control__items'],
	});
	controlAppItems.append(
		...controlAppItemsArr.map((item) => {
			const controlAppItem = createElement({
				tag: 'button',
				classes: ['app-control__item', 'btn'],
				text: item,
			});
			return controlAppItem;
		})
	);
	controlApp.append(controlAppItems);
	return controlAppItems;
}
