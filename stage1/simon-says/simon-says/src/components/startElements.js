import { createOptionContainer } from './startscreen.js';
import { createCounterContainer } from './startscreen.js';
import { createRepeatBtn } from './startscreen.js';
import { createInputContainer } from './startscreen.js';
import { createNewGameBtn } from './startscreen.js';
import { createNewRoundBtn } from './startscreen.js';

import keyboardContainer from './keyboard.js';

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
