import { LSControl } from './lsControl';
import { checkFinishGame } from '../logic/checkFinishGame';
import { stopTimer } from './timer';

export function handleCellClick(
	event,
	currentGameArr,
	_playerGameArr,
	_selectedGame,
	timerContainer,
	onFinishGame,
	sound
) {
	const soundClick = new Audio('./assets/sounds/left-btn-active.mp3');
	const soundCompletedGame = new Audio('./assets/sounds/game-completed.mp3');
	const soundClickOff = new Audio('./assets/sounds/left-btn-active-off.mp3');
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	const cellData = clickedCell.getAttribute('data-cell');
	const index = _playerGameArr.indexOf(cellData);
	clickedCell.classList.toggle('cell-active');
	if (clickedCell.closest('.cell-cross')) {
		clickedCell.classList.toggle('cell-cross');
	}

	if (index !== -1) {
		if (sound) soundClickOff.play();
		_playerGameArr.splice(index, 1);
	} else {
		if (sound) soundClick.play();
		_playerGameArr.push(cellData);
	}
	const finishGame = checkFinishGame(currentGameArr, _playerGameArr);
	if (finishGame) {
		if (sound) soundCompletedGame.play();
		stopTimer();
		const finishGameObj = {
			name: _selectedGame.name.slice(_selectedGame.name.search(/[A-Z]/)),
			level: _selectedGame.level,
			maket: _selectedGame.matrix,
			time: timerContainer.innerText,
		};
		const lsControl = new LSControl();
		lsControl.saveGameResult(finishGameObj);

		if (onFinishGame) onFinishGame();
	}
}

export function handleCellRightClick(
	event,
	_playerCrossArrTop,
	_playerCrossArrLeft,
	_playerCrossArrMain,
	sound
) {
	const soundClick = new Audio('./assets/sounds/right-btn-click.mp3');
	event.preventDefault();
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	if (sound) soundClick.play();
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
	}

	// Если клик был в верхней подсказке
	if (parentTop) {
		clickedCell.classList.toggle('cell-cross');
		if (indexTop !== -1) {
			_playerCrossArrTop.splice(indexTop, 1);
		} else {
			_playerCrossArrTop.push(cellData);
		}
	}

	// Если клик был в левой подсказке
	if (parentLeft) {
		clickedCell.classList.toggle('cell-cross');
		if (indexLeft !== -1) {
			_playerCrossArrLeft.splice(indexLeft, 1);
		} else {
			_playerCrossArrLeft.push(cellData);
		}
	}
}
