import { createKeyboard } from './keyboard.js';
import { initApp } from '../main.js';

const optionContainer = document.createElement('div');
optionContainer.className = 'option-container';

export const stargame = (
	headerContainer,
	levelsContainer,
	selectedLevel,
	startBtn
) => {
	startBtn.remove();

	const repeatBtn = document.createElement('div');
	repeatBtn.classList.add = ('btn', 'repet-btn');
	repeatBtn.innerText = 'Repeat Sequence';

	const counterContainer = document.createElement('div');
	counterContainer.className = 'counter-container';
	counterContainer.innerText = 'Round: 1';

	const inputContainer = document.createElement('div');
	inputContainer.className = 'input';
	headerContainer.insertAdjacentElement('afterend', inputContainer);

	const newGameBtn = document.createElement('div');
	newGameBtn.classList.add = ('btn', 'new-game-btn');
	newGameBtn.innerText = 'NEW GAME';

	createKeyboard(selectedLevel).insertAdjacentElement('afterend', newGameBtn);
	levelsContainer.classList.add('inactive');

	optionContainer.append(repeatBtn, counterContainer);
	headerContainer.append(optionContainer);

	createKeyboard(selectedLevel).addEventListener('click', (event) => {
		const clickedKey = event.target.closest('.key-container');
		inputContainer.append(clickedKey.innerText);
	});

	newGameBtn.addEventListener('click', () => {
		levelsContainer.classList.remove('inactive');

		initApp();
	});
};
