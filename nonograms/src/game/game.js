import { createMenu } from '../components/menu';
import { createElement } from '../utilits/createElem';
import { createLevelsMenu } from '../components/levels';
import { render } from '../index';
import { addGameListeners } from '../utilits/listeners';
import { matrixControl } from '../utilits/gameClass';
export class Game {
	constructor(app) {
		this.app = app;
	}

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
					const game = new matrixControl(startLevel);
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
						data: startLevel,
						_class: ['game-board'],
					});
					const leftBoardHelp = game.createBoard({
						data: game.getHelpArray(startLevel),
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

					addGameListeners(gameBoard, gameContainer, startLevel);
					render(gameContainer);
				}
			}
		);
		render(levelsMenu);
	}
}
