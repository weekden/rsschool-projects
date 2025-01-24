import { createElement } from '../utilits/createElem.js';

export function createBoard(data) {
	const table = createElement({ tag: 'table', classes: ['game-board'] });
	let count = 0;
	for (let i = 0; i < data.length; i++) {
		const rowElement = createElement({ tag: 'tr' });

		for (let j = 0; j < data[i].length; j++) {
			const cellElement = createElement({
				tag: 'td',
				classes: ['cell'],
			});
			cellElement.setAttribute('data-cell', count);
			count++;
			rowElement.appendChild(cellElement);
		}

		table.appendChild(rowElement);
	}
	return table;
}
