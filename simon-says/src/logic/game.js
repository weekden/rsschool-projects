import { highlightKeys } from '../components/keyboard.js';
import { GameArrControl } from './create-game-arr.js';
import { inputContainerId } from '../start.js';
import keyboardContainer from '../components/keyboard.js';

let roundCount = 1;
const MAX_ROUNDS = 5;
let inputContainer = null;
let isKeyProcessing = false;
let stackControl = null;
let entryControl = null;

export const startGame = (selectedLevel) => {
	console.log(selectedLevel);
	stackControl = new GameArrControl(selectedLevel);
	entryControl = new GameArrControl();
	inputContainer = document.getElementById(inputContainerId);

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
			roundCount++;
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

const newRound = (entry, _inputContainer) => {
	entry.clear();
	_inputContainer.innerHTML = '';
};
