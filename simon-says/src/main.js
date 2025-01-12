import { renderStartScreen } from './components/startscreen.js';

export const initApp = (newGamePhar) => {
	document.body.innerHTML = '';
	document.body.append(renderStartScreen(newGamePhar));
};
initApp();
