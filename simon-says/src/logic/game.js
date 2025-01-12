import { initApp } from '../main.js';
import { renderStartScreen } from '../components/startscreen.js';
import { highlightKeys } from '../components/keyboard.js';
import { GameArrControl } from './create-game-arr.js';
import { inputContainerId } from '../start.js';
import keyboardContainer from '../components/keyboard.js';
import { getSelectedLevel } from '../components/startscreen.js';
const MAX_ROUNDS = 5;
let stackControl = null;
let entryControl = null;
let roundCount = 1;

let inputContainer = null;
let counterContainer = null;
let newGameBtn = null;
let repeatBtn = null;
let newRoundBtn = null;

let isKeyProcessing = false;
let isClickedRepeatBtn = true;
let isMistake = false;

export const startGame = (selectedLevel) => {
	stackControl = new GameArrControl(selectedLevel);
	entryControl = new GameArrControl();
	inputContainer = document.getElementById(inputContainerId);
	counterContainer = document.querySelector('.counter-container');
	newGameBtn = document.querySelector('.new-game-btn');
	repeatBtn = document.querySelector('.repeat-btn');
	newRoundBtn = document.querySelector('.next-btn');
	newRoundBtn.style.display = 'none';

	updateRoundCount(roundCount);
	round(stackControl, keyboardContainer, inputContainer);
};

const round = (stack, _keyboardContainer, _inputContainer) => {
	repeatBtn.style.display = 'block';
	newRoundBtn.style.display = 'none';
	stack.addElements();
	isClickedRepeatBtn = true;
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
		if (isMistake) {
			console.log('game over');
			return;
		} else {
			isMistake = true;
			restartRound(stack, entry, _inputContainer);
			removeHandlers();
			console.log('error');
			return;
		}
	}

	if (entry.getStack().length === stack.getStack().length) {
		if (roundCount === MAX_ROUNDS) {
			console.log('end game');
			repeatBtn.disabled = true;
			removeHandlers();
		} else {
			isMistake = false;
			console.log('end round');
			removeHandlers();
			roundCount++;
			updateRoundCount(roundCount);
			clearInputAndEntryStack(entry, _inputContainer);
			repeatBtn.style.display = 'none';
			newRoundBtn.style.display = 'block';
		}
	}
};

export const removeHandlers = () => {
	keyboardContainer.removeEventListener('click', onKeyHandler);
	document.removeEventListener('keydown', onKeyboardHandler);
	newGameBtn.removeEventListener('click', () =>
		newGame(stackControl, entryControl)
	);
	// repeatBtn.removeEventListener('click', repeatSequence, { once: true });
	newRoundBtn.addEventListener('click', newRoundBtnclickHandler);
};

export const addHendlers = () => {
	keyboardContainer.addEventListener('click', onKeyHandler);
	document.addEventListener('keydown', onKeyboardHandler);
	newGameBtn.addEventListener('click', () =>
		newGame(stackControl, entryControl)
	);
	repeatBtn.addEventListener(
		'click',
		() => {
			repeatSequence(entryControl, inputContainer);
		},
		{ once: true }
	);
	newRoundBtn.addEventListener('click', newRoundBtnclickHandler);
};

const checkSequence = (clickedItem, stack, entry) => {
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

const clearInputAndEntryStack = (entry, _inputContainer) => {
	entry.clearEntry();
	_inputContainer.innerHTML = '';
};

const updateRoundCount = (count) => {
	counterContainer.innerText = `Round: ${count}`;
};

const newGame = (stack, entry) => {
	roundCount = 1;
	stack.clearStack();
	entry.clearEntry();
	const level = getSelectedLevel();
	initApp(level);
};

const repeatSequence = (entry, _inputContainer) => {
	if (!isClickedRepeatBtn) return;
	entry.clearEntry();
	_inputContainer.innerHTML = '';
	highlightKeys(stackControl.getStack(), keyboardContainer, isClickedRepeatBtn);
	repeatBtn.disabled = true;
	isClickedRepeatBtn = false;
};

const newRoundBtnclickHandler = () => {
	round(stackControl, keyboardContainer, inputContainer);
};

const restartRound = (stack, entry, _inputContainer) => {
	console.log('was mistake');
	clearInputAndEntryStack(entry, _inputContainer);
	isMistake = false;
	highlightKeys(stack.getStack(), keyboardContainer);
};
