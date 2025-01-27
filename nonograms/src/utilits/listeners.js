import { checkFinishGame } from '../logic/checkFinishGame';
const gameArr = [];
export const addGameListeners = (board, gameBoard, currentGameArr) => {
	board.addEventListener('click', (event) =>
		handleCellClick(event, currentGameArr)
	);
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(event)
	);
};
function handleCellClick(event, currentGameArr) {
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	clickedCell.classList.toggle('cell-active');
	if (clickedCell.closest('.cell-cross')) {
		clickedCell.classList.toggle('cell-cross');
		gameArr.splice(index, 1);
	}
	const cellData = clickedCell.getAttribute('data-cell');
	const index = gameArr.indexOf(cellData);
	if (index !== -1) {
		gameArr.splice(index, 1);
	} else {
		gameArr.push(cellData);
	}

	checkFinishGame(currentGameArr, gameArr);
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
