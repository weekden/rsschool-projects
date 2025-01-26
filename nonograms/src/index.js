import { dataEasy } from './data/data.js';
import { createElement } from './utilits/createElem.js';
import { matrixControl } from './utilits/gameClass.js';
import { addListeners } from './utilits/listeners.js';
import './styles/style.css';
document.addEventListener('DOMContentLoaded', () => {
	const game = new matrixControl(dataEasy.house);
	const gameBoard = game.createBoard({
		data: dataEasy.house,
		_class: ['game-board'],
	});
	const leftBoardHelp = game.createBoard({
		data: game.getHelpArray(dataEasy.house),
		_class: ['help-board', 'left-help'],
		flag: 'helpTable',
	});
	const topBoardHelp = game.createBoard({
		data: game.rotateArr(game.getHelpArray(game.rotateArr().reverse())),
		_class: ['help-board', 'top-help'],
		flag: 'helpTable',
		vertical: true,
	});
	const app = createElement({ tag: 'div', classes: ['app'] });
	const topApp = createElement({ tag: 'div', classes: ['top-app'] });
	const bottomApp = createElement({ tag: 'div', classes: ['bottom-app'] });
	const gameInfo = createElement({ tag: 'div', classes: ['info-app'] });
	topApp.append(gameInfo, topBoardHelp);
	bottomApp.append(leftBoardHelp, gameBoard);
	app.append(topApp, bottomApp);
	addListeners(gameBoard, app);
	document.body.append(app);
});
