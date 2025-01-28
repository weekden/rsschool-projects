import { matrixControl } from '../utilits/gameClass';
import { createElement } from '../utilits/createElem';
import { checkFinishGame } from '../logic/checkFinishGame';
let isTimerRunning = false;
export function createGameBoard(selectedGame) {
	const playerGameArr = [];
	const game = new matrixControl(selectedGame.matrix);
	// контейнер игрового поля
	const gameContainer = createElement({
		tag: 'div',
		classes: ['game-container'],
	});
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

	gameInfo.append(
		gameInfoCurrentGameName,
		gameInfoCurrentGameMaket,
		gameInfoTimer
	);

	topApp.append(gameInfo, topBoardHelp);
	bottomApp.append(leftBoardHelp, gameBoard);
	gameContainer.append(topApp, bottomApp);

	addEventListeners(
		gameBoard,
		gameContainer,
		selectedGame.matrix,
		playerGameArr,
		gameInfoTimer,
		isTimerRunning
	);
	return gameContainer;
}

const addEventListeners = (
	board,
	gameBoard,
	currentGameArr,
	_playerGameArr,
	_gameInfoTimer
) => {
	board.addEventListener('click', (event) =>
		handleCellClick(event, currentGameArr, _playerGameArr, _gameInfoTimer)
	);
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(event, _playerGameArr)
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
		_playerGameArr.splice(index, 1);
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

	checkFinishGame(currentGameArr, _playerGameArr);
}

function handleCellRightClick(event, _playerGameArr) {
	event.preventDefault();
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	const cellData = clickedCell.getAttribute('data-cell');
	const index = _playerGameArr.indexOf(cellData);
	if (clickedCell.closest('.cell-active')) {
		clickedCell.classList.toggle('cell-active');
		_playerGameArr.splice(index, 1);
	}
	clickedCell.classList.toggle('cell-cross');
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
