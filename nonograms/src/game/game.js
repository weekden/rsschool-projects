import { createElement } from '../utilits/createElem';
import { createMenu } from '../components/menu';
import { createLevelsMenu } from '../components/levels';
import { createGameBoard } from '../components/gameBoard';
import { createGameControlMenu } from '../components/gameMenu';
import { createRecordTable } from '../components/createTableRecords';
import { createSettingsMenu } from '../components/createSettigsMenu';
import { createModal } from '../components/modal';
import { data } from '../data/data';
import { matrixControl } from '../utilits/gameClass';
import { LSControl } from '../utilits/lsControl';
import { render } from '../index';

export class Game {
	constructor(app) {
		this.app = app;
		this.matix = null;
		this.saveMatrixObj = null;
		this.lsControl = new LSControl();
		this.matrixControl = new matrixControl(data);
		this.gameContainer = null;
		this.sound = true;
		this.light = true;
	}

	start(firstLoad) {
		this.app.innerHTML = '';
		const mainMenu = createMenu((selectMenu) => {
			if (selectMenu === 'continue') {
				const currentGame = this.lsControl.getCurrentGame();
				this.renderGameBorder(currentGame, false, true, this.sound);
			} else if (selectMenu === 'resume-save-game') {
				const resumeGameObj = this.lsControl.getLastGame();
				this.renderGameBorder(resumeGameObj, false, true, this.sound);
			} else if (selectMenu === 'change-level') {
				this.renderLevelsMenu();
			} else if (selectMenu === 'records') {
				this.renderRecordTable();
			} else if (selectMenu === 'settings') {
				this.renderSettingsMenu();
			}
		});
		render(mainMenu);

		const resumedBtn = this.app.querySelector('#resume-save-game');
		const recordsBtn = this.app.querySelector('#records');

		if (this.lsControl.getGameResults().length === 0) {
			recordsBtn.disabled = true;
		}
		if (!this.lsControl.getLastGame() && resumedBtn) {
			resumedBtn.disabled = true;
		}
		if (firstLoad) {
			const randomEasyMatrix = this.matrixControl.getRandomMatrix(0);
			this.renderGameBorder(randomEasyMatrix, false, false);
		}
	}

	renderRecordTable() {
		this.app.innerHTML = '';
		const saveGameArr = this.lsControl.getGameResults();
		this.lsControl.sortSaveGameResults(saveGameArr);
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
					this.renderGameBorder(startLevel, false, false, this.sound);
				}
			}
		);
		render(levelsMenu);
	}

	renderGameMenu() {
		const gameMenu = createGameControlMenu((selectedItem) => {
			if (selectedItem === 'menu') {
				this.lsControl.saveCurrentGame(this.saveMatrixObj);
				this.start();
			}
			if (selectedItem === 'show-solution') {
				const saveBtn = this.app.querySelector('#save-game');
				saveBtn.disabled = true;
				this.showSolution(this.matix);
			}
			if (selectedItem === 'save-game') {
				this.lsControl.saveLastGame(this.saveMatrixObj);
			}
			if (selectedItem === 'reset-game') {
				this.renderGameBorder(this.matix, false, false, this.sound);
			}
		});
		return gameMenu;
	}

	renderGameBorder(matix, solution = false, resumeGame = false, sound = true) {
		this.app.innerHTML = '';
		this.matix = matix;

		const gameContainer = createElement({
			tag: 'div',
			classes: ['game-container'],
		});

		const { gameContainer: board, saveMatrixObj } = createGameBoard(
			matix,
			solution,
			resumeGame,
			() => this.showFinishModal(saveMatrixObj._minuts, saveMatrixObj._seconds),
			sound
		);

		this.saveMatrixObj = saveMatrixObj;
		const gameMenu = this.renderGameMenu();
		gameContainer.append(gameMenu, board);
		render(gameContainer);
	}

	showSolution(matix) {
		this.gameContainer = document.querySelector('.table-container');
		this.gameContainer.innerHTML = '';
		this.matix = matix;
		const { gameContainer: solutonGame } = createGameBoard(matix, true, false);
		this.gameContainer.append(solutonGame);
	}

	showFinishModal(minutes, seconds) {
		const modal = createModal(minutes, seconds, (onClose) => {
			if (onClose);
			this.lsControl.clearCurrentGame();
			this.start(true);
		});

		this.app.append(modal);
	}

	renderSettingsMenu() {
		this.app.innerHTML = '';
		const settingsMenu = createSettingsMenu(
			(onBack) => {
				if (onBack);
				this.start();
			},
			(setSettingsBtn) => {
				if (setSettingsBtn === 'screen-theme-light') {
					document.body.classList.remove('dark-theme');
				} else if (setSettingsBtn === 'screen-theme-dark') {
					document.body.classList.add('dark-theme');
				} else if (setSettingsBtn === 'sound-off') {
					this.sound = false;
				} else if (setSettingsBtn === 'sound-on') {
					this.sound = true;
				}
			}
		);
		render(settingsMenu);
	}
}
