export const createModal = (text) => {
	// const overlay = createOverlay();
	// const modalOverlay = document.createElement('div');
	// modalOverlay.className = 'modal-overlay';

	const modal = document.createElement('div');
	const closeModalBtn = document.createElement('button');
	closeModalBtn.innerText = 'Close';
	closeModalBtn.className = 'btn-close-modal';

	modal.innerText = text;
	modal.className = 'modal';
	modal.append(closeModalBtn);

	// modalOverlay.append(modal);
	document.body.append(modal);
	document.body.classList.add('modal-active');

	closeModalBtn.addEventListener('click', () => closeModal(modal));

	return modal;
};

export const showModal = (modal) => {
	modal.classList.add('visible');
};

export const closeModal = (modal) => {
	modal.remove();
};

// const createOverlay = () => {
// 	const overlay = document.createElement('div');
// 	overlay.className = 'overlay';
// 	document.body.append(overlay);
// 	return overlay;
// };
