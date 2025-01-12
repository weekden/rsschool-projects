import { highlightKeys } from '../components/keyboard.js';
import { GameArrControl } from './create-game-arr.js';
import { inputContainerId } from '../start.js';
import keyboardContainer from '../components/keyboard.js';

const MAX_ROUNDS = 5;
let stackControl = null;
let entryControl = null;
let roundCount = 1;
let inputContainer = null;
let counterContainer = null;
let isKeyProcessing = false;

export const startGame = (selectedLevel) => {
	console.log(selectedLevel);
	stackControl = new GameArrControl(selectedLevel);
	entryControl = new GameArrControl();
	inputContainer = document.getElementById(inputContainerId);
	counterContainer = document.querySelector('.counter-container');
	counterContainer.innerText = `Round: ${roundCount++}`;
	round(stackControl, keyboardContainer, inputContainer);
};

const round = (stack, _keyboardContainer, _inputContainer) => {
	stack.addElements();
	console.log(stack.getStack());
	highlightKeys(stack.getStack(), _keyboardContainer);
};

export const onKeyHandler = (event) => {
	const clickedKey = event.target.closest('.key-container');
	if (clickedKey) {
		highlightKey(clickedKey);
		processInput(
			clickedKey.innerText,
			stackControl,
			entryControl,
			inputContainer
		);
	}
};

export const onKeyboardHandler = (event) => {
	if (isKeyProcessing) return;
	const pressedKey = event.key.toUpperCase();
	const virtualKey = keyboardContainer.querySelector(
		`.key-container[data-key="${pressedKey}"]`
	);
	highlightKey(virtualKey);
	if (virtualKey) {
		isKeyProcessing = true;
		processInput(pressedKey, stackControl, entryControl, inputContainer);
		setTimeout(() => {
			isKeyProcessing = false;
		}, 100);
	}
};

const processInput = (key, stack, entry, _inputContainer) => {
	_inputContainer.append(key);
	entry.push(key);
	console.log(entry.getStack());
	const isCorrect = checkSequence(key, stack, entry);
	if (!isCorrect) {
		newRound(entry, _inputContainer);
		console.log('error');
		return;
	}

	if (entry.getStack().length === stack.getStack().length) {
		if (roundCount === MAX_ROUNDS) {
			console.log('end game');
		} else {
			console.log('end round');
			counterContainer.innerText = `Round: ${roundCount++}`;
			newRound(entry, _inputContainer);
			round(stack, keyboardContainer, _inputContainer);
		}
	}
};

export const removeHandlers = () => {
	keyboardContainer.removeEventListener('click', onKeyHandler);
	document.removeEventListener('keydown', onKeyboardHandler);
};

export const addHendlers = () => {
	keyboardContainer.addEventListener('click', onKeyHandler);
	document.addEventListener('keydown', onKeyboardHandler);
};

export const checkSequence = (clickedItem, stack, entry) => {
	const currentIndex = entry.getStack().length - 1;
	const stackCorrectIndex = stack.getStack()[currentIndex];

	return clickedItem === stackCorrectIndex;
};

const highlightKey = (key) => {
	key.classList.add('highlight-key');
	setTimeout(() => {
		key.classList.remove('highlight-key');
	}, 300);
};

const newRound = (entry, _inputContainer) => {
	entry.clear();
	_inputContainer.innerHTML = '';
};
