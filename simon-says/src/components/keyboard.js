const keyboardContainer = document.createElement('div');
keyboardContainer.className = 'keyboard-container';

export const createKeyboard = (param = 'easy') => {
	const keys = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
	let keysForRender;
	if (param === 'easy') keysForRender = keys.slice(0, 10);
	if (param === 'medium') keysForRender = keys.slice(10);
	if (param === 'hard') keysForRender = keys;

	keyboardContainer.innerHTML = '';
	keysForRender.forEach((item) => {
		const keyContainer = document.createElement('div');
		keyContainer.className = 'key-container';
		keyContainer.innerText = item;
		keyboardContainer.append(keyContainer);
	});

	return keyboardContainer;
};
