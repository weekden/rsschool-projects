import type { PopupOptions } from '../../types/popup-types';
import { createButton } from './createButton';
import { onElementRemoved } from '../observer/elementObserver';

export const createPopup = ({ content, buttons }: PopupOptions): HTMLDivElement => {
  const popupWrappew = document.createElement('div');
  popupWrappew.className = 'overlay';

  const popup = document.createElement('div');
  popup.classList.add('popup');

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');

  if (typeof content === 'string') {
    popupContent.textContent = content;
  } else if (content instanceof HTMLTextAreaElement) {
    popupContent.appendChild(content);
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('popup-buttons');

  buttons.forEach(({ text, onClick }) => {
    const button = createButton(text, () => {
      if (content instanceof HTMLTextAreaElement) {
        onClick(popupWrappew, content);
      } else {
        onClick(popupWrappew);
      }
    });

    buttonContainer.appendChild(button);
  });

  popup.append(popupContent, buttonContainer);
  popupWrappew.append(popup);
  document.body.appendChild(popupWrappew);

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      popupWrappew.remove();
    }
  };

  const handleBodyClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLDivElement && !popup.contains(event.target)) {
      popupWrappew.remove();
    }
  };
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleBodyClick);
  document.body.style.overflow = 'hidden';

  onElementRemoved(popupWrappew, () => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleBodyClick);
    document.body.style.overflow = '';
  });
  return popupWrappew;
};
