import { dataEasy } from '../data/data';
import { checkFinishGame } from '../logic/checkFinishGame';
export const addGameListeners = (board, gameBoard, menu) => {
	board.addEventListener('click', (event) => handleCellClick(event));
	gameBoard.addEventListener('contextmenu', (event) =>
		handleCellRightClick(event)
	);
	menu.addEventListener('click', (event) => handelMenuClick(event, menu));
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

function handelMenuClick(event, menu) {
	const clickedMenuItem = event.target.closest('.menu-item');
	if (!clickedMenuItem) return;
	console.log(clickedMenuItem);
	if (clickedMenuItem.innerText === 'New Game') {
		menu.classList.add('hide');
	}
}
