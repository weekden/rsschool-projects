import { createKeyboard } from './keyboard.js';
import { stargame } from './startgame.js';
import { generationQueue } from './logic/generation.js';

import keyboardContainer from './keyboard.js';

export const renderStartScreen = () => {
	const appContainer = document.createElement('div');
	appContainer.className = 'app';

	const headerContainer = document.createElement('div');
	headerContainer.className = 'header-container';

	const levelsContainer = document.createElement('div');
	levelsContainer.classList.add('levels-container');

	const startBtn = document.createElement('div');
	startBtn.classList.add('btn', 'start-btn');
	startBtn.innerText = 'START';

	const levelsArray = ['easy', 'medium', 'hard'];
	const chahgeDifficulty = () => {
		levelsArray.forEach((item) => {
			const levelContainer = document.createElement('div');
			levelContainer.className = 'level';
			levelContainer.innerText = item;
			levelsContainer.append(levelContainer);
		});
		return levelsContainer;
	};

	headerContainer.append(chahgeDifficulty());
	let selectedLevel = levelsArray[0];

	levelsContainer.addEventListener('click', (event) => {
		const clickedItem = event.target.closest('.level');
		if (clickedItem) {
			selectedLevel = clickedItem.innerText;
			const newKeyboard = createKeyboard(generationQueue(selectedLevel));
			keyboardContainer.replaceWith(newKeyboard);
		}
	});
	startBtn.addEventListener('click', () =>
		stargame(headerContainer, levelsContainer, selectedLevel, startBtn)
	);
	appContainer.append(
		headerContainer,
		createKeyboard(generationQueue(selectedLevel)),
		startBtn
	);

	return appContainer;
};
