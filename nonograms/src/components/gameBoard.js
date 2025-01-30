import { matrixControl } from '../utilits/gameClass';
import { createElement } from '../utilits/createElem';
import { checkFinishGame } from '../logic/checkFinishGame';
import { createGameControlMenu } from './gameMenu';
let isTimerRunning = false;
// let resumeGame = false;
export function createGameBoard(
	selectedGame,
	onHeaderMenuItemSelect,
	solution = false,
	resumeGame = false
) {
	let playerGameArr = selectedGame._playerGameArr || [];
	let playerCrossArrTop = selectedGame._playerCrossArrTop || [];
	let playerCrossArrLeft = selectedGame._playerCrossArrLeft || [];
	let playerCrossArrMain = selectedGame._playerCrossArrMain || [];

	const game = new matrixControl(selectedGame.matrix);
	const saveMatrixObj = {
		level: selectedGame.level,
		name: selectedGame.name,
		matrix: selectedGame.matrix,
		_playerGameArr: playerGameArr,
		_playerCrossArrTop: playerCrossArrTop,
		_playerCrossArrLeft: playerCrossArrLeft,
		_playerCrossArrMain: playerCrossArrMain,
	};

	// контейнер игрового поля
	const gameContainer = createElement({
		tag: 'div',
		classes: ['game-container'],
	});
	// блок кнопок
	const headerAppWrapper = createElement({
		tag: 'div',
		classes: ['app-control'],
	});
	const headerApp = createGameControlMenu();
	// верхняя часть
	const topApp = createElement({ tag: 'div', classes: ['top-app'] });
	// нижняя часть
	const bottomApp = createElement({
		tag: 'div',
		classes: ['bottom-app'],
	});
	// игровое поле
	const gameBoard = game.createBoard({
		data: selectedGame.matrix,
		_class: ['game-board', 'table-boarder'],
		mainBoard: selectedGame.level,
		_solution: solution,
	});
	// поле подсказок левое
	const leftBoardHelp = game.createBoard({
		data: game.getHelpArray(selectedGame.matrix),
		_class: ['help-board', 'left-help'],
		flag: 'helpTable',
		horizontal: true,
		mainBoard: selectedGame.level,
	});
	// поле подсказок верхнее
	const topBoardHelp = game.createBoard({
		data: game.rotateArr(game.getHelpArray(game.rotateArr().reverse())),
		_class: ['help-board', 'top-help'],
		flag: 'helpTable',
		vertical: true,
		mainBoard: selectedGame.level,
	});
	// информационное поле
	const gameInfo = createElement({
		tag: 'div',
		classes: ['info-app'],
	});

	const gameInfoCurrentGameName = createElement({
		tag: 'div',
		classes: ['info-app__level'],
		text: `${selectedGame.name.slice(selectedGame.name.search(/[A-Z]/))}`,
	});

	const gameInfoCurrentGameMaket = game.createBoard({
		data: selectedGame.matrix,
		tag: 'table',
		_class: ['maket-image', 'table-boarder', 'info-app__maket'],
		infoBlock: selectedGame.level,
	});

	const gameInfoTimer = createElement({
		tag: 'div',
		classes: ['info-app__level'],
		text: '00 : 00',
	});

	if (resumeGame) {
		setTimeout(() => {
			addClassToElements(
				'.game-board',
				'data-cell',
				'cell-active',
				playerGameArr
			);
		}, 0);
		setTimeout(() => {
			addClassToElements(
				'.game-board',
				'data-cell',
				'cell-cross',
				playerCrossArrMain
			);
		}, 0);
		setTimeout(() => {
			addClassToElements(
				'.top-help',
				'data-cell',
				'cell-cross',
				playerCrossArrTop
			);
		}, 0);
		setTimeout(() => {
			addClassToElements(
				'.left-help',
				'data-cell',
				'cell-cross',
				playerCrossArrLeft
			);
		}, 0);
	}

	gameInfo.append(
		gameInfoCurrentGameName,
		gameInfoCurrentGameMaket,
		gameInfoTimer
	);

	headerAppWrapper.append(headerApp);
	topApp.append(gameInfo, topBoardHelp);
	bottomApp.append(leftBoardHelp, gameBoard);
	gameContainer.append(headerAppWrapper, topApp, bottomApp);

	headerAppWrapper.addEventListener('click', (event) => {
		const clickedCell = event.target.closest('.app-control__item');
		if (!clickedCell) return;
		const clickedItemTypeId = clickedCell.id;
		if (clickedItemTypeId === 'reset-game') {
			playerGameArr = [];
			playerCrossArrLeft = [];
			playerCrossArrTop = [];
			playerCrossArrMain = [];
		}
		if (clickedItemTypeId === 'show-solution') {
			const saveGameBtn = document.querySelector('#save-game');
			saveGameBtn.disabled = true;
			saveGameBtn.classList.add('disabled');
			console.log(saveGameBtn);
		}
		onHeaderMenuItemSelect(clickedItemTypeId, saveMatrixObj);
		isTimerRunning = false;
	});

	if (!solution)
		addEventListeners({
			board: gameBoard,
			gameBoard: gameContainer,
			currentGameArr: selectedGame.matrix,
			_playerGameArr: playerGameArr,
			_gameInfoTimer: gameInfoTimer,
			_playerCrossArrTop: playerCrossArrTop,
			_playerCrossArrLeft: playerCrossArrLeft,
			_playerCrossArrMain: playerCrossArrMain,
		});
	return gameContainer;
}

const addEventListeners = (values) => {
	const {
		board,
		gameBoard,
		currentGameArr,
		_playerGameArr,
		_gameInfoTimer,
		_playerCrossArrTop,
		_playerCrossArrLeft,
		_playerCrossArrMain,
	} = values;
	board.addEventListener('click', (event) =>
		handleCellClick(event, currentGameArr, _playerGameArr, _gameInfoTimer)
	);
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(
			event,
			_playerCrossArrTop,
			_playerCrossArrLeft,
			_playerCrossArrMain
		)
	);
};

function handleCellClick(
	event,
	currentGameArr,
	_playerGameArr,
	_gameInfoTimer
) {
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	const cellData = clickedCell.getAttribute('data-cell');
	const index = _playerGameArr.indexOf(cellData);
	clickedCell.classList.toggle('cell-active');
	if (clickedCell.closest('.cell-cross')) {
		clickedCell.classList.toggle('cell-cross');
	}

	if (index !== -1) {
		_playerGameArr.splice(index, 1);
	} else {
		_playerGameArr.push(cellData);
		if (!isTimerRunning && _playerGameArr.length > 0) {
			isTimerRunning = true;
			startTimer(_gameInfoTimer, isTimerRunning);
		}
	}
	console.log(_playerGameArr);
	checkFinishGame(currentGameArr, _playerGameArr);
}

function handleCellRightClick(
	event,
	_playerCrossArrTop,
	_playerCrossArrLeft,
	_playerCrossArrMain
) {
	event.preventDefault();
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	const cellData = clickedCell.getAttribute('data-cell');
	const indexMain = _playerCrossArrMain.indexOf(cellData);
	const indexTop = _playerCrossArrTop.indexOf(cellData);
	const indexLeft = _playerCrossArrLeft.indexOf(cellData);

	const parentBoard = event.target.closest('.game-board');
	const parentTop = event.target.closest('.top-help');
	const parentLeft = event.target.closest('.left-help');

	if (parentBoard) {
		clickedCell.classList.toggle('cell-cross');
		if (clickedCell.closest('cell-active')) {
			clickedCell.classList.toggle('cell-active');
		}

		if (indexMain !== -1) {
			_playerCrossArrMain.splice(indexMain, 1);
		} else {
			_playerCrossArrMain.push(cellData);
		}
		console.log(_playerCrossArrMain);
	}

	// Если клик был в верхней подсказке
	if (parentTop) {
		clickedCell.classList.toggle('cell-cross');
		if (indexTop !== -1) {
			_playerCrossArrTop.splice(indexTop, 1);
		} else {
			_playerCrossArrTop.push(cellData);
		}
		console.log(_playerCrossArrTop);
	}

	// Если клик был в левой подсказке
	if (parentLeft) {
		clickedCell.classList.toggle('cell-cross');
		if (indexLeft !== -1) {
			_playerCrossArrLeft.splice(indexLeft, 1);
		} else {
			_playerCrossArrLeft.push(cellData);
		}
		console.log(_playerCrossArrLeft);
	}
}

function startTimer(container, _isTimerRunning) {
	let minuts = 0;
	let seconds = 0;
	const formatTime = (value) => (value < 10 ? `0${value}` : value);
	const updateTimer = () => {
		if (!_isTimerRunning) return;
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minuts++;
		}
		const time = `${formatTime(minuts)} : ${formatTime(seconds)}`;
		container.textContent = time;
		setTimeout(updateTimer, 1000);
	};
	updateTimer();
}

function addClassToElements(
	parentContainerSelector,
	attribute,
	className,
	valuesArray
) {
	const parentContainer = document.querySelector(parentContainerSelector);
	if (!parentContainer) return;
	const elementsList = parentContainer.querySelectorAll('.cell-main-board');
	elementsList.forEach((elem) => {
		const elAttribute = elem.getAttribute(attribute);

		if (valuesArray.includes(elAttribute)) {
			elem.classList.add(className);
		}
	});
}
