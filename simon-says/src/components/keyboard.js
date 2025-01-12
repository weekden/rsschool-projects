import { addHendlers } from '../logic/game.js';
import { removeHandlers } from '../logic/game.js';

const keyboardContainer = document.createElement('div');
export const createKeyboard = (keysForRender) => {
	keyboardContainer.id = 'keyboardContainer';
	keyboardContainer.className = 'keyboard-container';
	keyboardContainer.innerHTML = '';
	keysForRender.forEach((item) => {
		const keyContainer = document.createElement('div');
		keyContainer.className = 'key-container';
		keyContainer.innerText = item;
		keyContainer.setAttribute('data-key', item);
		keyboardContainer.append(keyContainer);
	});

	return keyboardContainer;
};
export default keyboardContainer;

export function highlightKeys(stack, _keyboardContainer, repeat) {
	removeHandlers();
	document.querySelector('.new-game-btn').disabled = true;
	document.querySelector('.repeat-btn').disabled = true;
	stack.forEach((key, index) => {
		setTimeout(() => {
			const keyElement = _keyboardContainer.querySelector(
				`.key-container[data-key="${key}"]`
			);
			if (keyElement) {
				keyElement.classList.add('highlight');
				setTimeout(() => {
					keyElement.classList.remove('highlight');
				}, 1000);
			}
			if (index === stack.length - 1) {
				setTimeout(() => {
					addHendlers();
					document.querySelector('.new-game-btn').disabled = false;
					document.querySelector('.repeat-btn').disabled = false;
					if (repeat) document.querySelector('.repeat-btn').disabled = true;
				}, 1000);
			}
		}, index * 1000);
	});
}
