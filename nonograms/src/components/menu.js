import { createElement } from '../utilits/createElem.js';

export function createMenu(onMenuSelect) {
	const menuItemsArr = ['New Game', 'Resume Game', 'Records'];
	const blockMenu = createElement({ tag: 'div', classes: ['menu'] });
	const blockMenuItems = createElement({ tag: 'div', classes: ['menu-items'] });
	blockMenuItems.append(
		...menuItemsArr.map((item) => {
			const liElement = createElement({
				tag: 'button',
				classes: ['menu-item', 'btn'],
				text: item,
			});
			liElement.addEventListener('click', () => onMenuSelect(item));
			return liElement;
		})
	);
	blockMenu.append(blockMenuItems);
	return blockMenu;
}
