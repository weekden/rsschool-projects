import { initApp } from './main.js';
import { createOptionContainer } from './components/startscreen.js';
import { createCounterContainer } from './components/startscreen.js';
import { createRepeatBtn } from './components/startscreen.js';
import { createInputContainer } from './components/startscreen.js';
import { createNewGameBtn } from './components/startscreen.js';
import { GameArrControl } from './logic/create-game-arr.js';
import { highlightKeys } from './components/keyboard.js';
import { generationQueue } from './logic/generation.js';

import keyboardContainer from './components/keyboard.js';

export const startGame = (
	headerContainer,
	levelsContainer,
	selectedLevel,
	startBtn
) => {
	startBtn.remove();

	const optionContainer = createOptionContainer();
	const counterContainer = createCounterContainer();
	const inputContainer = createInputContainer();
	const newGameBtn = createNewGameBtn();
	const repeatBtn = createRepeatBtn();

	levelsContainer.classList.add('inactive');
	headerContainer.insertAdjacentElement('afterend', inputContainer);

	keyboardContainer.insertAdjacentElement('afterend', newGameBtn);
	optionContainer.append(counterContainer, repeatBtn);

	headerContainer.append(optionContainer);

	const stackControl = new GameArrControl(generationQueue(selectedLevel));
	stackControl.addElements();
	highlightKeys(stackControl.getStack(), keyboardContainer);

	keyboardContainer.addEventListener('click', (event) => {
		const clickedKey = event.target.closest('.key-container');
		if (clickedKey) inputContainer.append(clickedKey.innerText);
	});

	newGameBtn.addEventListener('click', () => {
		levelsContainer.classList.remove('inactive');
		initApp();
	});

	repeatBtn.addEventListener('click', () => {
		highlightKeys(stackControl.getStack(), keyboardContainer);
	});
};
