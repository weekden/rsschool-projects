import { createElement } from '../utilits/createElem.js';
export class matrixControl {
	constructor(data) {
		this.data = data;
	}

	getHelpArray(arr) {
		const helpArray = [];

		for (let i = 0; i < arr.length; i++) {
			let currenArr = [];
			let rowHint = [];

			for (let j = 0; j < arr.length; j++) {
				const cell = arr[i][j];

				if (cell === 1) {
					// Если 1 добавляем в currentArr
					currenArr.push(j);
				} else {
					// Если 0 и currentArr не пуст, добавляем currentArr кол-во правильных клеток(длинна currentArr) в массив подсказок данной строки
					if (currenArr.length > 0) {
						rowHint.push(currenArr.length);
						currenArr = []; // Очищаем currentArr
					}
				}
			}

			// После выхода из цикла добавляем currentArr в массив подсказок строки
			if (currenArr.length > 0) {
				rowHint.push(currenArr.length);
			}
			helpArray.push(rowHint);
		}
		return helpArray;
	}
	// Метод поворота матрицы (для построения массива подсказок по вертикали)
	rotateArr(arr) {
		const inputMatrix = arr || JSON.parse(JSON.stringify(this.data));
		const len = inputMatrix.length;

		for (let i = 0; i < len; i += 1) {
			for (let j = i + 1; j < len; j += 1) {
				const memoryItem = inputMatrix[i][j];
				inputMatrix[i][j] = inputMatrix[j][i];
				inputMatrix[j][i] = memoryItem;
			}
		}

		for (let i = 0; i < len; i += 1) {
			for (let j = 0; j < Math.floor(len / 2); j += 1) {
				const memoryItem = inputMatrix[i][j];
				inputMatrix[i][j] = inputMatrix[i][len - 1 - j];
				inputMatrix[i][len - 1 - j] = memoryItem;
			}
		}
		return inputMatrix;
	}
	// создание таблиц
	createBoard(options) {
		const { data = [], _class, flag, vertical, maket } = options;
		// console.log(_class);
		const maxWidth = data.reduce((acc, item) => Math.max(acc, item.length), 0);
		let maxHight = data.length;
		let _data = data;
		if (vertical) {
			_data = data.filter((item) =>
				item.some((elem) => typeof elem === 'number')
			);
			const minHeight = _data.length;
			maxHight = minHeight;
		}

		const table = createElement({
			tag: 'table',
			classes: _class,
		});
		let count = 1;
		for (let i = 0; i < maxHight; i++) {
			const rowElement = createElement({ tag: 'tr' });

			for (let j = 0; j < maxWidth; j++) {
				const cellClasses = ['cell'];
				if (!maket) {
					if ((i + 1) % 5 === 0) cellClasses.push('border-bottom');
					if ((j + 1) % 5 === 0) cellClasses.push('border-right');
				}
				if (maket) {
					if (maket === 'easy') cellClasses.push('cell-easy-size');
					if (maket === 'medium') cellClasses.push('cell-medium-size');
					if (maket === 'hard') cellClasses.push('cell-hard-size');
					if (_data[i][j]) cellClasses.push('cell-active');
				}
				const cellElement = createElement({
					tag: 'td',
					// text: _data[i][j] !== undefined ? _data[i][j] : '',
					text: flag && _data[i][j] !== undefined ? _data[i][j] : '',
					classes: cellClasses,
				});
				cellElement.setAttribute('data-cell', count);
				count++;
				flag ? rowElement.prepend(cellElement) : rowElement.append(cellElement);
				if (flag && vertical) rowElement.append(cellElement);
			}
			vertical ? table.prepend(rowElement) : table.append(rowElement);
		}
		return table;
	}
}

// const game = new matrixControl([
// 	[0, 0, 1, 0, 0],
// 	[0, 1, 1, 1, 0],
// 	[1, 0, 1, 0, 1],
// 	[0, 1, 1, 1, 0],
// 	[0, 1, 1, 1, 0],
// ]);
// console.log(game.getHelpArray());
// console.log(game.getHelpArray(game.rotateArr()));
// console.log(game.getHelpArray());
