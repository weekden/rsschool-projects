import { matrixControl } from '../utilits/gameClass';
import { createElement } from '../utilits/createElem';
import { checkFinishGame } from '../logic/checkFinishGame';

export function createGameBoard(level) {
	const playerGameArr = [];
	const game = new matrixControl(level);
	const gameContainer = createElement({
		tag: 'div',
		classes: ['game-container'],
	});
	const topApp = createElement({ tag: 'div', classes: ['top-app'] });
	const bottomApp = createElement({
		tag: 'div',
		classes: ['bottom-app'],
	});
	const gameInfo = createElement({ tag: 'div', classes: ['info-app'] });
	const gameBoard = game.createBoard({
		data: level,
		_class: ['game-board'],
	});
	const leftBoardHelp = game.createBoard({
		data: game.getHelpArray(level),
		_class: ['help-board', 'left-help'],
		flag: 'helpTable',
		horizontal: true,
	});
	const topBoardHelp = game.createBoard({
		data: game.rotateArr(game.getHelpArray(game.rotateArr().reverse())),
		_class: ['help-board', 'top-help'],
		flag: 'helpTable',
		vertical: true,
	});
	topApp.append(gameInfo, topBoardHelp);
	bottomApp.append(leftBoardHelp, gameBoard);
	gameContainer.append(topApp, bottomApp);

	addEventListeners(gameBoard, gameContainer, level, playerGameArr);
	return gameContainer;
}

const addEventListeners = (
	board,
	gameBoard,
	currentGameArr,
	_playerGameArr
) => {
	board.addEventListener('click', (event) =>
		handleCellClick(event, currentGameArr, _playerGameArr)
	);
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(event)
	);
};

function handleCellClick(event, currentGameArr, _playerGameArr) {
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	clickedCell.classList.toggle('cell-active');
	if (clickedCell.closest('.cell-cross')) {
		clickedCell.classList.toggle('cell-cross');
		_playerGameArr.splice(index, 1);
	}
	const cellData = clickedCell.getAttribute('data-cell');
	const index = _playerGameArr.indexOf(cellData);
	if (index !== -1) {
		_playerGameArr.splice(index, 1);
	} else {
		_playerGameArr.push(cellData);
	}

	checkFinishGame(currentGameArr, _playerGameArr);
}

function handleCellRightClick(event) {
	event.preventDefault();
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	if (clickedCell.closest('.cell-active')) {
		clickedCell.classList.toggle('cell-active');
	}
	clickedCell.classList.toggle('cell-cross');
}
