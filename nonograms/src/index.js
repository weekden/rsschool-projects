import { dataEasy } from './data/data.js';
import { createElement } from './utilits/createElem.js';
import { matrixControl } from './utilits/gameClass.js';
import './styles/style.css';

const game = new matrixControl(dataEasy.house);

const app = createElement({ tag: 'div', classes: ['app'] });
const gameBoard = game.createBoard({ data: dataEasy.house });
const leftBoardHelp = game.createBoard({
	data: game.getHelpArray(dataEasy.house),
	flag: 'helpTable',
});
const topBoardHelp = game.createBoard({
	data: game.getHelpArray(game.rotateArr()).reverse(),
	_class: 'vertival-help-board',
	flag: 'helpTable',
});
app.append(gameBoard, leftBoardHelp, topBoardHelp);
document.body.append(app);
