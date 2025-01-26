import { dataEasy } from '../data/data';
import { checkFinishGame } from '../logic/checkFinishGame';
export const addListeners = (board, gameBoard) => {
	board.addEventListener('click', (event) => handleCellClick(event));
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(event)
	);
};
const gameArr = [];
function handleCellClick(event) {
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	clickedCell.classList.toggle('cell-active');
	const cellData = clickedCell.getAttribute('data-cell');
	const index = gameArr.indexOf(cellData);
	if (index !== -1) {
		gameArr.splice(index, 1);
	} else {
		gameArr.push(cellData);
	}

	checkFinishGame(dataEasy.house, gameArr);
}

function handleCellRightClick(event) {
	event.preventDefault();
	const clickedCell = event.target.closest('.cell');
	if (!clickedCell) return;
	clickedCell.classList.toggle('cell-cross');
}
