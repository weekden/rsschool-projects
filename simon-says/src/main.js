import { renderStartScreen } from './components/startscreen.js';

export const initApp = () => {
	document.body.innerHTML = '';
	document.body.append(renderStartScreen());
};
initApp();
