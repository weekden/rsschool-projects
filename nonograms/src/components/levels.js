import { createElement } from '../utilits/createElem';
import { matrixControl } from '../utilits/gameClass';
import { data } from '../data/data';

export function createLevelsMenu() {
	const board = new matrixControl();
	const levelsContainer = createElement({
		tag: 'div',
		classes: ['levels-items'],
	});

	Object.entries(data).forEach(([level, games]) => {
		const levelItem = createElement({
			tag: 'div',
			classes: ['levels-items__item'],
		});

		const levelType = createElement({
			tag: 'div',
			text: level,
			classes: ['levels-items__item-type'],
		});

		const levelImages = createElement({
			tag: 'div',
			classes: ['levels-items__item-img'],
		});

		Object.entries(games).forEach((game) => {
			// console.log(game);
			const gameName = game[0];
			const gameMatrix = game[1];
			const gameImageWrapper = createElement({
				tag: 'div',
				classes: ['levels-items__item-container'],
			});
			gameImageWrapper.setAttribute('data-game', gameName);
			gameImageWrapper.append(
				board.createBoard({
					data: gameMatrix,
					tag: 'table',
					_class: ['maket-image', 'game-board'],
					maket: level,
				})
			);
			// console.log(level);
			levelImages.append(gameImageWrapper);
		});

		levelItem.append(levelType);
		levelItem.append(levelImages);

		levelsContainer.append(levelItem);
	});

	levelsContainer.addEventListener('click', (event) => hendelLevelClick(event));

	return levelsContainer;
}

// function hendelLevelClick(event) {
// 	const clickedGame = event.target.closest('.maket-image');
// 	if (!clickedGame) return;

// 	console.log(clickedGame);
// }
