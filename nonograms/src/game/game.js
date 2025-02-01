import { createMenu } from '../components/menu';
import { createLevelsMenu } from '../components/levels';
import { createGameBoard } from '../components/gameBoard';
import { LSControl } from '../utilits/lsControl';
import { render } from '../index';
import { createElement } from '../utilits/createElem';
import { createGameControlMenu } from '../components/gameMenu';
import { createRecordTable } from '../components/createTableRecords';

export class Game {
	constructor(app) {
		this.app = app;
		this.matix = null;
		this.saveMatrixObj = null;
		this.lsControl = new LSControl();
		this.gameContainer = null;
		this.saveBtn = null;
	}

	start() {
		this.app.innerHTML = '';
		const mainMenu = createMenu((selectMenu) => {
			if (selectMenu === 'New Game') {
				this.renderLevelsMenu();
			} else if (selectMenu === 'Resume Game') {
				const resumeGameObj = this.lsControl.getLastGame();
				this.renderGameBorder(resumeGameObj, false, true);
			} else if (selectMenu === 'Records') {
				this.renderRecordTable();
			}
		});
		render(mainMenu);
	}

	renderRecordTable() {
		this.app.innerHTML = '';
		const saveGameArr = this.lsControl.getGameResults();
		const recordTable = createRecordTable(saveGameArr, (onBack) => {
			if (onBack);
			this.start();
		});
		render(recordTable);
	}

	renderLevelsMenu() {
		this.app.innerHTML = '';
		const levelsMenu = createLevelsMenu(
			(onBack) => {
				if (onBack);
				this.start();
			},
			(startLevel) => {
				if (startLevel) {
					this.renderGameBorder(startLevel);
				}
			}
		);
		render(levelsMenu);
	}

	renderGameMenu() {
		const gameMenu = createGameControlMenu((selectedItem) => {
			if (selectedItem === 'menu') this.start();
			if (selectedItem === 'show-solution') {
				this.saveBtn = this.app.querySelector('#save-game');
				this.saveBtn.disabled = true;
				this.showSolution(this.matix);
			}
			if (selectedItem === 'save-game') {
				this.lsControl.saveLastGame(this.saveMatrixObj);
			}
			if (selectedItem === 'reset-game') {
				this.renderGameBorder(this.matix, false, false);
			}
		});
		return gameMenu;
	}

	renderGameBorder(matix, solution = false, resumeGame = false) {
		this.app.innerHTML = '';
		this.matix = matix;

		const gameContainer = createElement({
			tag: 'div',
			classes: ['game-container'],
		});

		const { gameContainer: board, saveMatrixObj } = createGameBoard(
			matix,
			solution,
			resumeGame
		);

		this.saveMatrixObj = saveMatrixObj;

		const gameMenu = this.renderGameMenu();

		gameContainer.append(board, gameMenu);
		render(gameContainer);
	}

	showSolution(matix) {
		this.gameContainer = document.querySelector('.table-container');
		this.gameContainer.innerHTML = '';
		this.matix = matix;
		const { gameContainer: solutonGame } = createGameBoard(matix, true, false);
		this.gameContainer.append(solutonGame);
	}
}
