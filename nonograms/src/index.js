import { createBoard } from './components/createBoard.js';
import { dataEasy } from './data/data.js';
import { createElement } from './utilits/createElem.js';
import './styles/style.css';

const app = createElement({ tag: 'div', classes: ['app'] });
const board = createBoard(dataEasy.haus);
app.append(board);
document.body.append(app);
