import { createElement } from '../utilits/createElem.js';
export class matrixControl {
	constructor(data) {
		this.data = data;
	}
	// Создание массива для полей с подсказками
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
		const {
			data = [],
			_class,
			flag,
			vertical,
			horizontal,
			maket,
			infoBlock,
		} = options;
		let _data = data;
		let maxHeight = _data.length;
		let maxWidth = _data.length;
		if (vertical) maxHeight = 5;
		if (horizontal) maxWidth = 5;

		const table = createElement({
			tag: 'table',
			classes: _class,
		});
		let count = 1;
		for (let i = 0; i < maxHeight; i++) {
			const rowElement = createElement({ tag: 'tr' });

			for (let j = 0; j < maxWidth; j++) {
				const cellClasses = ['cell'];
				if (!maket && !flag) {
					if ((i + 1) % 5 === 0) cellClasses.push('border-bottom');
					if ((j + 1) % 5 === 0) cellClasses.push('border-right');
				}
				if (horizontal) {
					if ((i + 1) % 5 === 0) cellClasses.push('border-bottom');
					if (_data[i][j]) cellClasses.push('help-board__cell');
				}
				if (vertical) {
					if ((j + 1) % 5 === 0) cellClasses.push('border-right');
					if (_data[i][j]) cellClasses.push('help-board__cell');
				}
				if (maket) {
					// infoBlock
					// 	? document.documentElement.style.setProperty(
					// 			'--table-size',
					// 			`${80}px`
					// 		)
					// 	: document.documentElement.style.setProperty(
					// 			'--table-size',
					// 			`${100}px`
					// 		);
					if (maket === 'easy') cellClasses.push('cell-easy-size');
					if (maket === 'medium') cellClasses.push('cell-medium-size');
					if (maket === 'hard') cellClasses.push('cell-hard-size');
					if (_data[i][j]) cellClasses.push('cell-active');
				}
				const cellElement = createElement({
					tag: 'td',
					text: flag && _data[i][j] !== undefined ? _data[i][j] : '',
					classes: cellClasses,
				});
				if (!flag && !maket) cellElement.setAttribute('data-cell', count);
				count++;
				flag ? rowElement.prepend(cellElement) : rowElement.append(cellElement);
				if (flag && vertical) rowElement.append(cellElement);
			}
			vertical ? table.prepend(rowElement) : table.append(rowElement);
		}
		return table;
	}

	getMatrix(_name) {
		for (const level in this.data) {
			if (this.data[level][_name]) {
				const matrixObj = {
					level: level,
					name: _name,
					matrix: this.data[level][_name],
				};
				return matrixObj;
			}
		}
	}

	getRandomMatrix() {
		const levels = Object.keys(this.data);
		const randomLevel = levels[Math.floor(Math.random() * levels.length)];
		const matrixes = Object.keys(this.data[randomLevel]);
		const randomMatrixName =
			matrixes[Math.floor(Math.random() * matrixes.length)];
		const matrixObj = {
			level: randomLevel,
			name: randomMatrixName,
			matrix: this.data[randomLevel][randomMatrixName],
		};
		return matrixObj;
	}
}

// import { createElement } from '../utilits/createElem.js';
// export class matrixControl {
// 	constructor(data) {
// 		this.data = data;
// 	}
// 	// Создание массива для полей с подсказками
// 	getHelpArray(arr) {
// 		const helpArray = [];

// 		for (let i = 0; i < arr.length; i++) {
// 			let currenArr = [];
// 			let rowHint = [];

// 			for (let j = 0; j < arr.length; j++) {
// 				const cell = arr[i][j];

// 				if (cell === 1) {
// 					// Если 1 добавляем в currentArr
// 					currenArr.push(j);
// 				} else {
// 					// Если 0 и currentArr не пуст, добавляем currentArr кол-во правильных клеток(длинна currentArr) в массив подсказок данной строки
// 					if (currenArr.length > 0) {
// 						rowHint.push(currenArr.length);
// 						currenArr = []; // Очищаем currentArr
// 					}
// 				}
// 			}

// 			// После выхода из цикла добавляем currentArr в массив подсказок строки
// 			if (currenArr.length > 0) {
// 				rowHint.push(currenArr.length);
// 			}
// 			helpArray.push(rowHint);
// 		}
// 		return helpArray;
// 	}
// 	// Метод поворота матрицы (для построения массива подсказок по вертикали)
// 	rotateArr(arr) {
// 		const inputMatrix = arr || JSON.parse(JSON.stringify(this.data));
// 		const len = inputMatrix.length;

// 		for (let i = 0; i < len; i += 1) {
// 			for (let j = i + 1; j < len; j += 1) {
// 				const memoryItem = inputMatrix[i][j];
// 				inputMatrix[i][j] = inputMatrix[j][i];
// 				inputMatrix[j][i] = memoryItem;
// 			}
// 		}

// 		for (let i = 0; i < len; i += 1) {
// 			for (let j = 0; j < Math.floor(len / 2); j += 1) {
// 				const memoryItem = inputMatrix[i][j];
// 				inputMatrix[i][j] = inputMatrix[i][len - 1 - j];
// 				inputMatrix[i][len - 1 - j] = memoryItem;
// 			}
// 		}
// 		return inputMatrix;
// 	}
// 	// создание таблиц
// 	createBoard(options) {
// 		const {
// 			data = [],
// 			_class,
// 			flag,
// 			vertical,
// 			horizontal,
// 			maket,
// 			infoBlock,
// 		} = options;
// 		let _data = data;
// 		let maxHeight = _data.length;
// 		let maxWidth = _data.length;
// 		if (vertical) maxHeight = 5;
// 		if (horizontal) maxWidth = 5;

// 		const table = createElement({
// 			tag: 'table',
// 			classes: _class,
// 		});
// 		let count = 1;
// 		for (let i = 0; i < maxHeight; i++) {
// 			const rowElement = createElement({ tag: 'tr' });

// 			for (let j = 0; j < maxWidth; j++) {
// 				const cellClasses = ['cell'];
// 				if (!maket && !flag) {
// 					if ((i + 1) % 5 === 0) cellClasses.push('border-bottom');
// 					if ((j + 1) % 5 === 0) cellClasses.push('border-right');
// 				}
// 				if (horizontal) {
// 					if ((i + 1) % 5 === 0) cellClasses.push('border-bottom');
// 					if (_data[i][j]) cellClasses.push('help-board__cell');
// 				}
// 				if (vertical) {
// 					if ((j + 1) % 5 === 0) cellClasses.push('border-right');
// 					if (_data[i][j]) cellClasses.push('help-board__cell');
// 				}
// 				if (maket) {
// 					// infoBlock
// 					// 	? document.documentElement.style.setProperty(
// 					// 			'--table-size',
// 					// 			`${80}px`
// 					// 		)
// 					// 	: document.documentElement.style.setProperty(
// 					// 			'--table-size',
// 					// 			`${100}px`
// 					// 		);
// 					if (maket === 'easy') cellClasses.push('cell-easy-size');
// 					if (maket === 'medium') cellClasses.push('cell-medium-size');
// 					if (maket === 'hard') cellClasses.push('cell-hard-size');
// 					if (_data[i][j]) cellClasses.push('cell-active');
// 				}
// 				const cellElement = createElement({
// 					tag: 'td',
// 					text: flag && _data[i][j] !== undefined ? _data[i][j] : '',
// 					classes: cellClasses,
// 				});
// 				if (!flag && !maket) cellElement.setAttribute('data-cell', count);
// 				count++;
// 				flag ? rowElement.prepend(cellElement) : rowElement.append(cellElement);
// 				if (flag && vertical) rowElement.append(cellElement);
// 			}
// 			vertical ? table.prepend(rowElement) : table.append(rowElement);
// 		}
// 		return table;
// 	}

// 	getMatrix(_name) {
// 		for (const level in this.data) {
// 			if (this.data[level][_name]) {
// 				const matrixObj = {
// 					level: level,
// 					name: _name,
// 					matrix: this.data[level][_name],
// 				};
// 				return matrixObj;
// 			}
// 		}
// 	}

// 	getRandomMatrix() {
// 		const levels = Object.keys(this.data);
// 		const randomLevel = levels[Math.floor(Math.random() * levels.length)];
// 		const matrixes = Object.keys(this.data[randomLevel]);
// 		const randomMatrixName =
// 			matrixes[Math.floor(Math.random() * matrixes.length)];
// 		const matrixObj = {
// 			level: randomLevel,
// 			name: randomMatrixName,
// 			matrix: this.data[randomLevel][randomMatrixName],
// 		};
// 		return matrixObj;
// 	}
// }
