const keyboardContainer = document.createElement('div');
export const createKeyboard = (keysForRender) => {
	keyboardContainer.className = 'keyboard-container';
	keyboardContainer.innerHTML = '';
	keysForRender.forEach((item) => {
		const keyContainer = document.createElement('div');
		keyContainer.className = 'key-container';
		keyContainer.innerText = item;
		keyboardContainer.append(keyContainer);
	});

	return keyboardContainer;
};
export default keyboardContainer;
