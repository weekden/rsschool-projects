const keyboardContainer = document.createElement('div');
export const createKeyboard = (keysForRender) => {
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

export function highlightKeys(stack, keyboardContainer) {
	stack.forEach((key, index) => {
		setTimeout(() => {
			const keyElement = keyboardContainer.querySelector(
				`.key-container[data-key="${key}"]`
			);
			if (keyElement) {
				keyElement.classList.add('highlight');
				setTimeout(() => {
					keyElement.classList.remove('highlight');
				}, 500);
			}
		}, index * 500);
	});
}
