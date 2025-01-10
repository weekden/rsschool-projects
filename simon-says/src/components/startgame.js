import { initApp } from '../main.js';
import { GameArrControl } from './logic/create-game-arr.js';
import { highlightKeys } from './keyboard.js';
import { generationQueue } from './logic/generation.js';
import keyboardContainer from './keyboard.js';

export const stargame = (
	headerContainer,
	levelsContainer,
	selectedLevel,
	startBtn
) => {
	startBtn.remove();
	const optionContainer = document.createElement('div');
	optionContainer.className = 'option-container';

	const repeatBtn = document.createElement('div');
	repeatBtn.classList.add('btn', 'repet-btn');
	repeatBtn.innerText = 'Repeat Sequence';

	const counterContainer = document.createElement('div');
	counterContainer.className = 'counter-container';
	counterContainer.innerText = 'Round: 1';

	const inputContainer = document.createElement('div');
	inputContainer.className = 'input';
	headerContainer.insertAdjacentElement('afterend', inputContainer);

	const newGameBtn = document.createElement('div');
	newGameBtn.classList.add('btn', 'new-game-btn');
	newGameBtn.innerText = 'NEW GAME';

	keyboardContainer.insertAdjacentElement('afterend', newGameBtn);
	levelsContainer.classList.add('inactive');

	optionContainer.append(repeatBtn, counterContainer);
	headerContainer.append(optionContainer);

	const stackControl = new GameArrControl(generationQueue(selectedLevel));
	stackControl.addElements();
	highlightKeys(stackControl.getStack(), keyboardContainer);

	keyboardContainer.addEventListener('click', (event) => {
		const clickedKey = event.target.closest('.key-container');
		inputContainer.append(clickedKey.innerText);
	});

	newGameBtn.addEventListener('click', () => {
		levelsContainer.classList.remove('inactive');
		initApp();
	});

	repeatBtn.addEventListener('click', () => {
		highlightKeys(stackControl.getStack(), keyboardContainer);
	});
};
