import { createElement } from '../utilits/createElem';
import { matrixControl } from '../utilits/gameClass';
import { data } from '../data/data';

export function createLevelsMenu(onBack, startLevel) {
	let selectedLevel = null;
	const board = new matrixControl(data);
	const levelsContainer = createElement({
		tag: 'div',
		classes: ['levels-items'],
	});

	const controlContainer = createElement({
		tag: 'div',
		classes: ['level-items__control'],
		children: [
			createElement({
				tag: 'button',
				text: 'Menu',
				classes: ['btn', 'btn-back'],
			}),
			createElement({
				tag: 'button',
				text: 'Random Game',
				classes: ['btn', 'btn-random-game'],
			}),
		],
	});

	const changlevelsContainer = createElement({
		tag: 'div',
		classes: ['level-items__levels'],
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
					_class: ['maket-image', 'table-boarder'],
					maket: level,
				})
			);
			levelImages.append(gameImageWrapper);
		});

		levelItem.append(levelType);
		levelItem.append(levelImages);

		changlevelsContainer.append(levelItem);
	});

	controlContainer.querySelector('.btn-back').addEventListener('click', () => {
		onBack();
	});

	controlContainer
		.querySelector('.btn-random-game')
		.addEventListener('click', () => {
			const randomMatrix = board.getRandomMatrix();
			selectedLevel = randomMatrix;
			const containers = Array.from(
				changlevelsContainer.querySelectorAll('.levels-items__item-container')
			);
			containers.forEach((item) =>
				item.classList.remove('levels-items__item-selected')
			);

			const selectedMaket = containers.find(
				(item) => item.getAttribute('data-game') === randomMatrix.name
			);

			if (selectedMaket) {
				selectedMaket.classList.add('levels-items__item-selected');
			}
			setTimeout(() => {
				startLevel(selectedLevel);
			}, 1000);
		});

	changlevelsContainer.addEventListener('click', (event) => {
		const clickedMaket = event.target.closest('.levels-items__item-container');
		if (!clickedMaket) return;
		const clickedMaketName = clickedMaket.getAttribute('data-game');
		selectedLevel = board.getMatrix(clickedMaketName);
		startLevel(selectedLevel);
	});
	levelsContainer.append(controlContainer, changlevelsContainer);
	return levelsContainer;
}
