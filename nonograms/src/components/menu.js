import { createElement } from '../utilits/createElem.js';

export function createMenu(onMenuSelect) {
	const menuItemsArr = ['New Game', 'Resume Game', 'Records'];
	const blockMenu = createElement({ tag: 'div', classes: ['menu'] });
	const blockMenuItems = createElement({ tag: 'div', classes: ['menu-items'] });
	blockMenuItems.append(
		...menuItemsArr.map((item) => {
			const menuElement = createElement({
				tag: 'button',
				classes: ['menu-item', 'btn'],
				text: item,
			});
			menuElement.addEventListener('click', () => onMenuSelect(item));
			return menuElement;
		})
	);
	blockMenu.append(blockMenuItems);
	return blockMenu;
}
