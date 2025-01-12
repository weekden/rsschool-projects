import { highlightKeys } from '../components/keyboard.js';
import { GameArrControl } from './create-game-arr.js';

import { inputContainerId } from '../start.js';
import keyboardContainer from '../components/keyboard.js';

let roundCount = 1;
const MAX_ROUNDS = 5;
let inputContainer = null;

export const startGame = (selectedLevel) => {
	console.log(selectedLevel);
	const stackControl = new GameArrControl(selectedLevel);
	const entryControl = new GameArrControl();
	inputContainer = document.getElementById(inputContainerId);

	round(stackControl, entryControl, keyboardContainer, inputContainer);
};

const round = (stack, entry, _keyboardContainer, _inputContainer) => {
	stack.addElements();
	console.log(stack.getStack());
	highlightKeys(stack.getStack(), _keyboardContainer);

	const onKeyHandler = (event) => {
		const clickedKey = event.target.closest('.key-container');
		if (clickedKey) {
			processInput(clickedKey.innerText, stack, entry, _inputContainer);
		}
	};

	const onKeyboardHandler = (event) => {
		const pressedKey = event.key.toUpperCase();
		const virtualKey = keyboardContainer.querySelector(
			`.key-container[data-key="${pressedKey}"]`
		);
		if (virtualKey) {
			processInput(pressedKey, stack, entry, _inputContainer);
		}
	};

	keyboardContainer.addEventListener('click', onKeyHandler);
	document.addEventListener('keydown', onKeyboardHandler);

	const removeHandlers = () => {
		keyboardContainer.removeEventListener('click', onKeyHandler);
		document.removeEventListener('keydown', onKeyboardHandler);
	};

	const processInput = (key, stack, entry, _inputContainer) => {
		_inputContainer.append(key);
		entry.push(key);

		const isCorrect = checkSequence(key, stack, entry);
		if (!isCorrect) {
			newRound(entry, _inputContainer);
			console.log('error');
			removeHandlers();
			return;
		}

		if (entry.getStack().length === stack.getStack().length) {
			if (roundCount === MAX_ROUNDS) {
				console.log('end game');
				removeHandlers();
			} else {
				console.log('end round');
				roundCount++;
				newRound(entry, _inputContainer);
				removeHandlers();
				round(stack, entry, _keyboardContainer, _inputContainer);
			}
		}
	};
};

export const checkSequence = (clickedItem, stack, entry) => {
	const currentIndex = entry.getStack().length - 1;
	const stackCorrectIndex = stack.getStack()[currentIndex];

	return clickedItem === stackCorrectIndex;
};

const newRound = (entry, _inputContainer) => {
	entry.clear();
	_inputContainer.innerHTML = '';
};
