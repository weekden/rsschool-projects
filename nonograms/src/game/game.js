import { createMenu } from '../components/menu';
import { createLevelsMenu } from '../components/levels';
import { createGameBoard } from '../components/gameBoard';
import { LSControl } from '../utilits/lsControl';
import { render } from '../index';

export class Game {
	constructor(app) {
		this.app = app;
		this.matix = null;
		this.lsControl = new LSControl();
	}

	start() {
		const mainMenu = createMenu((selectMenu) => {
			if (selectMenu === 'New Game') {
				this.renderLevelsMenu();
			} else if (selectMenu === 'Resume Game') {
				const resumeGameObj = this.lsControl.getLastGame();
				this.renderGameBorder(resumeGameObj, false, true);
			}
		});
		render(mainMenu);
	}

	renderLevelsMenu() {
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

	renderGameBorder(matix, solution = false, resumeGame = false) {
		this.matix = matix;
		const gameBoard = createGameBoard(
			matix,
			this.callback,
			(solution = false),
			resumeGame
		);
		render(gameBoard);
	}

	showSolution(matix) {
		this.matix = matix;
		const solutonGame = createGameBoard(matix, this.callback, true);
		render(solutonGame);
	}

	callback = (controlMenuItemId, saveMatrixObj) => {
		if (controlMenuItemId === 'menu') {
			this.start();
		} else if (controlMenuItemId === 'show-solution') {
			this.showSolution(this.matix);
		} else if (controlMenuItemId === 'reset-game') {
			this.renderGameBorder(this.matix);
		} else if (controlMenuItemId === 'save-game') {
			this.lsControl.saveLastGame(saveMatrixObj);
		}
	};
}
