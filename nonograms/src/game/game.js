import { createMenu } from '../components/menu';
import { createLevelsMenu } from '../components/levels';
import { createGameBoard } from '../components/gameBoard';
import { render } from '../index';

export class Game {
	constructor(app) {
		this.app = app;
		this.matix = null;
	}
	// matix;
	start() {
		const mainMenu = createMenu((selectMenu) => {
			if (selectMenu === 'New Game') {
				this.renderLevelsMenu();
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

	renderGameBorder(matix) {
		this.matix = matix;
		const gameBoard = createGameBoard(matix, this.callback);
		render(gameBoard);
	}

	showSolution(matix, solution) {
		this.matix = matix;
		const solutonGame = createGameBoard(
			matix,
			this.callback,
			(solution = true)
		);
		render(solutonGame);
	}

	handleClikItems;
	callback = (controlMenuItem) => {
		if (controlMenuItem === 'Menu') {
			this.start();
		} else if (controlMenuItem === 'Show Solution') {
			this.showSolution(this.matix);
		} else if (controlMenuItem === 'Reset Game') {
			this.renderGameBorder(this.matix);
		}
	};
}
