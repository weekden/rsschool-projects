import { dataEasy } from './data/data.js';
import { createElement } from './utilits/createElem.js';
import { matrixControl } from './utilits/gameClass.js';
import { addGameListeners } from './utilits/listeners.js';
import { createMenu } from './components/menu.js';
import { createLevelsMenu } from './components/levels.js';
import './styles/style.css';
// document.addEventListener('DOMContentLoaded', () => {
const game = new matrixControl(dataEasy.mediumStar);
const gameBoard = game.createBoard({
	data: dataEasy.mediumStar,
	_class: ['game-board'],
});
const leftBoardHelp = game.createBoard({
	data: game.getHelpArray(dataEasy.mediumStar),
	_class: ['help-board', 'left-help'],
	flag: 'helpTable',
	gorizontal: true,
});
const topBoardHelp = game.createBoard({
	data: game.rotateArr(game.getHelpArray(game.rotateArr().reverse())),
	_class: ['help-board', 'top-help'],
	flag: 'helpTable',
	vertical: true,
});
const app = createElement({ tag: 'div', classes: ['app'] });
const gameContainer = createElement({
	tag: 'div',
	classes: ['game-container'],
});
const topApp = createElement({ tag: 'div', classes: ['top-app'] });
const bottomApp = createElement({ tag: 'div', classes: ['bottom-app'] });
const gameInfo = createElement({ tag: 'div', classes: ['info-app'] });
const mainMenu = createMenu();
const levelsMenu = createLevelsMenu();
topApp.append(gameInfo, topBoardHelp);
bottomApp.append(leftBoardHelp, gameBoard);
gameContainer.append(topApp, bottomApp);
app.append(mainMenu, gameContainer);
addGameListeners(gameBoard, gameContainer);
document.body.append(app, levelsMenu);
// });
