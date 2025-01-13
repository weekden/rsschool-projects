import { createKeyboard } from './keyboard.js';
import { createComponents } from '../start.js';
import { generationQueue } from '../logic/generation.js';
import { startGame } from '../logic/game.js';

let selectedLevel = null;
export const getSelectedLevel = () => selectedLevel;
export const renderStartScreen = (newGamePhar) => {
	const appContainer = document.createElement('div');
	appContainer.className = 'app';

	const headerContainer = document.createElement('div');
	headerContainer.className = 'header-container';

	const levelsContainer = document.createElement('div');
	levelsContainer.classList.add('levels-container');

	const startBtn = document.createElement('button');
	startBtn.classList.add('btn', 'start-btn');
	startBtn.innerText = 'START';

	const levelsArray = ['easy', 'medium', 'hard'];
	const chahgeDifficulty = (level) => {
		levelsArray.forEach((item) => {
			const levelContainer = document.createElement('div');
			levelContainer.className = 'level';
			levelContainer.setAttribute('data-currentLevel', item);
			if (item === level) levelContainer.classList.add('level-current');
			levelContainer.innerText = item;
			levelsContainer.append(levelContainer);
		});
		return levelsContainer;
	};

	if (newGamePhar) {
		selectedLevel = newGamePhar;
	} else selectedLevel = levelsArray[0];

	headerContainer.append(chahgeDifficulty(selectedLevel));
	levelsContainer.addEventListener('click', (event) => {
		const clickedItem = event.target.closest('.level');
		if (clickedItem) {
			selectedLevel = clickedItem.innerText;
			const newKeyboard = createKeyboard(generationQueue(selectedLevel));
			keyboardContainer.replaceWith(newKeyboard);

			const allLevels = document.querySelectorAll('.level');
			allLevels.forEach((level) => level.classList.remove('level-current'));

			clickedItem.classList.add('level-current');
		}
	});

	startBtn.addEventListener('click', () => {
		createComponents(headerContainer, levelsContainer, startBtn);
		startGame(generationQueue(selectedLevel));
	});

	appContainer.append(
		headerContainer,
		createKeyboard(generationQueue(selectedLevel)),
		startBtn
	);

	return appContainer;
};

export const createOptionContainer = () => {
	const optionContainer = document.createElement('div');
	optionContainer.className = 'option-container';
	return optionContainer;
};

export const createCounterContainer = () => {
	const counterContainer = document.createElement('div');
	counterContainer.className = 'counter-container';
	return counterContainer;
};

export const createInputContainer = (containerId) => {
	const inputContainer = document.createElement('div');
	inputContainer.className = 'input';
	inputContainer.id = containerId;
	return inputContainer;
};

export const createNewGameBtn = () => {
	const newGameBtn = document.createElement('button');
	newGameBtn.className = 'btn new-game-btn';
	newGameBtn.innerText = 'NEW GAME';
	return newGameBtn;
};

export const createRepeatBtn = () => {
	const repeatBtn = document.createElement('button');
	repeatBtn.className = 'btn repeat-btn';
	repeatBtn.innerText = 'Repeat Sequence';
	return repeatBtn;
};

export const createNewRoundBtn = () => {
	const newRoundBtn = document.createElement('button');
	newRoundBtn.className = 'btn next-btn';
	newRoundBtn.innerText = 'Next Round';
	return newRoundBtn;
};
