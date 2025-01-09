import { createKeyboard } from './keyboard.js';
export const renderStartScreen = () => {
	const headerContainer = document.createElement('div');
	headerContainer.className = 'header-container';

	const levelsContainer = document.createElement('div');
	levelsContainer.classList = 'levels';

	const startBtn = document.createElement('div');
	startBtn.className = 'start-btn';
	startBtn.innerText = 'START';

	const chahgeDifficulty = () => {
		levelsContainer.className = 'levels';
		const levelsArray = ['easy', 'medium', 'hard'];
		levelsArray.forEach((item) => {
			const levelContainer = document.createElement('div');
			levelContainer.className = 'level';
			levelContainer.innerText = item;
			levelsContainer.append(levelContainer);
		});
		return levelsContainer;
	};

	headerContainer.append(chahgeDifficulty());
	levelsContainer.addEventListener('click', (event) => {
		const clickedItem = event.target.closest('.level');
		createKeyboard(clickedItem.innerText);
	});
	return [headerContainer, createKeyboard(), startBtn];
};
