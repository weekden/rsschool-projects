import { createElement } from '../utilits/createElem';

export function createModal(minutes, seconds, onClose) {
	const overlay = createOverlay();
	const modalOverlay = createElement({
		tag: 'div',
		classes: ['modal-overlay'],
	});
	const modalFinishGame = createElement({
		tag: 'div',
		text: `Congratulations, your time is ${minutes} minutes and ${seconds} seconds`,
		classes: ['modal'],
	});
	const closeModalBtn = createElement({
		tag: 'button',
		text: 'Close',
		classes: ['btn', 'btn-close-modal'],
	});
	modalFinishGame.append(closeModalBtn);
	modalOverlay.append(modalFinishGame);

	document.body.append(modalFinishGame);
	document.body.classList.add('modal-active');

	closeModalBtn.addEventListener('click', () => {
		onClose();
		overlay.remove();
	});

	return modalFinishGame;
}

function createOverlay() {
	const overlay = createElement({ tag: 'div', classes: ['overlay'] });
	document.body.append(overlay);
	return overlay;
}
