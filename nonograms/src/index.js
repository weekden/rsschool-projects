import { dataEasy } from './data/data.js';
import { createElement } from './utilits/createElem.js';
import { matrixControl } from './utilits/gameClass.js';
import './styles/style.css';

const game = new matrixControl(dataEasy.house);
const gameBoard = game.createBoard({ data: dataEasy.house });
const leftBoardHelp = game.createBoard({
	data: game.getHelpArray(dataEasy.house),
	flag: 'helpTable',
});
const topBoardHelp = game.createBoard({
	data: game.rotateArr(game.getHelpArray(game.rotateArr().reverse())),
	_class: 'vertival-help-board',
	flag: 'helpTable',
	vertical: true,
});
const app = createElement({ tag: 'div', classes: ['app'] });
const topApp = createElement({ tag: 'div', classes: ['top-app'] });
const bottomApp = createElement({ tag: 'div', classes: ['bottom-app'] });
const gameInfo = createElement({ tag: 'div', classes: ['info-app'] });
// const app = createElement({ tag: 'div', classes: ['app'] });
topApp.append(gameInfo, topBoardHelp);
bottomApp.append(leftBoardHelp, gameBoard);
app.append(topApp, bottomApp);
document.body.append(app);
