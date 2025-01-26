import { createElement } from '../utilits/createElem.js';

export function createMenu() {
	const menuItemsArr = ['New Game', 'Resume Game', 'Records'];
	const blockMenu = createElement({ tag: 'div', classes: ['menu'] });
	const blockMenuItems = createElement({ tag: 'ul', classes: ['menu-items'] });
	blockMenuItems.append(
		...menuItemsArr.map((item) => {
			const liElement = createElement({
				tag: 'li',
				classes: ['menu-item'],
				text: item,
			});
			return liElement;
		})
	);
	blockMenu.append(blockMenuItems);
	return blockMenu;
}
