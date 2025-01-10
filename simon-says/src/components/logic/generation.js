const keyArr = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
export const generationQueue = (pharam) => {
	let keysForRender;
	if (pharam === 'easy') keysForRender = keyArr.slice(0, 10);
	if (pharam === 'medium') keysForRender = keyArr.slice(10);
	if (pharam === 'hard') keysForRender = keyArr;
	return keysForRender;
};
