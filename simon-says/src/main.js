import { renderStartScreen } from './components/startscreen.js';

document.addEventListener('DOMContentLoaded', () => {
	const appContainer = document.createElement('div');
	appContainer.className = 'app';
	renderStartScreen().forEach((item) => appContainer.append(item));

	document.body.append(appContainer);
});
