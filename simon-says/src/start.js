import { createOptionContainer } from './components/startscreen.js';
import { createCounterContainer } from './components/startscreen.js';
import { createRepeatBtn } from './components/startscreen.js';
import { createInputContainer } from './components/startscreen.js';
import { createNewGameBtn } from './components/startscreen.js';
import { createNewRoundBtn } from './components/startscreen.js';

import keyboardContainer from './components/keyboard.js';

export const inputContainerId = 'inputContainer';
export const createComponents = (
	headerContainer,
	levelsContainer,
	startBtn
) => {
	startBtn.remove();

	const optionContainer = createOptionContainer();
	const counterContainer = createCounterContainer();
	const inputContainer = createInputContainer(inputContainerId);
	const newGameBtn = createNewGameBtn();
	const repeatBtn = createRepeatBtn();
	const newRoundBtn = createNewRoundBtn();

	levelsContainer.classList.add('inactive');
	headerContainer.insertAdjacentElement('afterend', inputContainer);

	keyboardContainer.insertAdjacentElement('afterend', newGameBtn);
	optionContainer.append(counterContainer, repeatBtn, newRoundBtn);

	headerContainer.append(optionContainer);
};
