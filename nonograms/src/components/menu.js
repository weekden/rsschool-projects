import { createElement } from '../utilits/createElem.js';

export function createMenu(onMenuSelect) {
	const menuItemsArr = [
		'Continue',
		'Resume Saved Game',
		'Change Level',
		'Records',
		'Settings',
	];
	const blockMenu = createElement({ tag: 'div', classes: ['menu', 'bg'] });
	const blockMenuItems = createElement({ tag: 'div', classes: ['menu-items'] });
	blockMenuItems.append(
		...menuItemsArr.map((item) => {
			const itemId = item.toLowerCase().split(' ').join('-');
			const menuElement = createElement({
				tag: 'button',
				classes: ['menu-item', 'btn'],
				text: item,
				id: itemId,
			});
			menuElement.addEventListener('click', () => onMenuSelect(itemId));
			return menuElement;
		})
	);
	blockMenu.append(blockMenuItems);
	return blockMenu;
}
