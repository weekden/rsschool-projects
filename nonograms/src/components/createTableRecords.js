import { createElement } from '../utilits/createElem';
import { matrixControl } from '../utilits/gameClass';

export function createRecordTable(obj) {
	const game = new matrixControl();
	const tableHeaderArr = ['#', 'Name', 'Level', 'Maket', 'Time'];
	const tableContainer = createElement({
		tag: 'div',
		classes: ['record-table-container', 'table-boarder'],
	});

	const recordTable = createElement({
		tag: 'table',
		classes: ['record-table'],
	});

	const thead = createElement({ tag: 'thead' });
	const headerRow = createElement({ tag: 'tr' });

	tableHeaderArr.forEach((item) => {
		const th = createElement({
			tag: 'th',
			text: item.toUpperCase(),
			classes: ['record-header'],
		});
		headerRow.append(th);
	});

	thead.append(headerRow);

	const tbody = createElement({ tag: 'tbody' });

	obj.forEach((item, index) => {
		const tableRow = createElement({ tag: 'tr', classes: ['record-row'] });
		const maket = game.createBoard({
			data: item.maket,
			tag: 'table',
			_class: ['maket-image', 'table-boarder', 'info-app__maket'],
			infoBlock: item.level,
		});
		const numberCell = createElement({
			tag: 'td',
			classes: ['record-row__cell'],
			text: index + 1,
		});
		const nameCell = createElement({
			tag: 'td',
			classes: ['record-row__cell'],
			text: item.name.toUpperCase(),
		});
		const levelCell = createElement({
			tag: 'td',
			classes: ['record-row__cell'],
			text: item.level,
		});
		const gameCell = createElement({
			tag: 'td',
			classes: ['record-row__cell', 'record-row__cell-maket'],
		});
		const timeCell = createElement({
			tag: 'td',
			classes: ['record-row__cell'],
			text: item.time,
		});
		gameCell.append(maket);
		tableRow.append(numberCell, nameCell, levelCell, gameCell, timeCell);
		tbody.append(tableRow);
	});

	recordTable.append(thead, tbody);
	tableContainer.append(recordTable);

	return tableContainer;
}
