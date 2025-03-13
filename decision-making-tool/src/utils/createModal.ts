import type { ModalOptions } from '../types/modal-types';
import { createButton } from './createButton';

export const createModal = ({ content, buttons }: ModalOptions): HTMLDivElement => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  if (typeof content === 'string') {
    modalContent.textContent = content;
  } else if (content instanceof HTMLTextAreaElement) {
    modalContent.appendChild(content);
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('modal-buttons');

  buttons.forEach(({ text, onClick }) => {
    const button = createButton(text, () => {
      if (content instanceof HTMLTextAreaElement) {
        onClick(modal, content);
      }
    });

    buttonContainer.appendChild(button);
  });

  modal.append(modalContent, buttonContainer);
  document.body.appendChild(modal);

  return modal;
};
