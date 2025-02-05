import { matrixControl } from '../utilits/gameClass';
import { createElement } from '../utilits/createElem';
import { formatTime } from '../utilits/timer';
import { startTimer } from '../utilits/timer';
import { handleCellClick } from '../game/listeners';
import { handleCellRightClick } from '../game/listeners';

export function createGameBoard(
	selectedGame,
	solution = false,
	resumeGame = false,
	onFinishGame,
	sound
) {
	let playerGameArr = resumeGame ? selectedGame._playerGameArr : [];
	let playerCrossArrTop = resumeGame ? selectedGame._playerCrossArrTop : [];
	let playerCrossArrLeft = resumeGame ? selectedGame._playerCrossArrLeft : [];
	let playerCrossArrMain = resumeGame ? selectedGame._playerCrossArrMain : [];
	let minuts = resumeGame ? selectedGame._minuts : 0;
	let seconds = resumeGame ? selectedGame._seconds : 0;

	const game = new matrixControl(selectedGame.matrix);

	const saveMatrixObj = {
		level: selectedGame.level,
		name: selectedGame.name,
		matrix: selectedGame.matrix,
		_playerGameArr: playerGameArr,
		_playerCrossArrTop: playerCrossArrTop,
		_playerCrossArrLeft: playerCrossArrLeft,
		_playerCrossArrMain: playerCrossArrMain,
		_minuts: minuts,
		_seconds: seconds,
	};

	// контейнер игрового поля
	const gameContainer = createElement({
		tag: 'div',
		classes: ['table-container'],
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
		text: `${selectedGame.name.slice(selectedGame.name.search(/[A-Z]/)).toUpperCase()}`,
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
		text: `${formatTime(minuts)} : ${formatTime(seconds)}`,
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

	function onCellClick(event) {
		handleCellClick(
			event,
			selectedGame.matrix,
			playerGameArr,
			selectedGame,
			gameInfoTimer,
			onFinishGame,
			sound
		);
	}

	function onCellRightClick(event) {
		handleCellRightClick(
			event,
			playerCrossArrTop,
			playerCrossArrLeft,
			playerCrossArrMain,
			sound,
			playerGameArr
		);
	}

	function onStartTimer() {
		startTimer(gameInfoTimer, minuts, seconds, saveMatrixObj);
	}

	gameInfo.append(
		gameInfoCurrentGameName,
		gameInfoCurrentGameMaket,
		gameInfoTimer
	);

	topApp.append(gameInfo, topBoardHelp);
	bottomApp.append(leftBoardHelp, gameBoard);
	gameContainer.append(topApp, bottomApp);

	gameBoard.removeEventListener('click', onCellClick);
	gameContainer.removeEventListener('contextmenu', onCellRightClick);
	gameBoard.removeEventListener('click', onStartTimer, { once: true });

	if (!solution) {
		gameBoard.addEventListener('click', onCellClick);
		gameContainer.addEventListener('contextmenu', onCellRightClick);
		gameBoard.addEventListener('click', onStartTimer, { once: true });
	}
	return { gameContainer, saveMatrixObj };
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
