import { createElement } from './utilits/createElem.js';
import { Game } from './game/game.js';

import './styles/style.css';

const app = createElement({ tag: 'div', classes: ['app'] });
const game = new Game(app);
export const render = (elem) => {
	app.append(elem);
	document.body.append(app);
};
game.start(true);
