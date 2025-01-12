import { createKeyboard } from './keyboard.js';
import { createComponents } from '../start.js';
import { generationQueue } from '../logic/generation.js';
import { startGame } from '../logic/game.js';
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
	counterContainer.innerText = 'Round: 1';
	return counterContainer;
};

export const createInputContainer = (containerId) => {
	const inputContainer = document.createElement('div');
	inputContainer.className = 'input';
	inputContainer.id = containerId;
	return inputContainer;
};

export const createNewGameBtn = () => {
	const newGameBtn = document.createElement('div');
	newGameBtn.className = 'btn new-game-btn';
	newGameBtn.innerText = 'NEW GAME';
	return newGameBtn;
};

export const createRepeatBtn = () => {
	const repeatBtn = document.createElement('div');
	repeatBtn.className = 'btn repeat-btn';
	repeatBtn.innerText = 'Repeat Sequence';
	return repeatBtn;
};
