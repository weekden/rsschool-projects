import { createElement } from '../utilits/createElem';

export function createGameControlMenu(selectedItem) {
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
	console.log('buttons render');
	controlAppItems.append(
		...controlAppItemsArr.map((item) => {
			const controlAppItem = createElement({
				tag: 'button',
				classes: ['app-control__item', 'btn'],
				text: item,
				id: item.toLowerCase().split(' ').join('-'),
			});
			return controlAppItem;
		})
	);
	controlApp.append(controlAppItems);
	controlApp.addEventListener('click', (event) =>
		handleClickGameMenu(event, selectedItem)
	);
	return controlApp;
}

function handleClickGameMenu(event, _selectedItem) {
	const clickedCell = event.target.closest('.app-control__item');
	if (!clickedCell) return;
	const clickedItemTypeId = clickedCell.id;
	_selectedItem(clickedItemTypeId);
}
