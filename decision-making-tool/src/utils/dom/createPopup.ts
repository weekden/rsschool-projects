import { createElement } from './createElement';
import { createButton } from './createButton';
import { onElementRemoved } from '../observer/elementObserver';

import type { PopupOptions } from '../../types/popup-types';

export const createPopup = ({ content, buttons }: PopupOptions): HTMLElement => {
  const popupWrapper = createElement({ tag: 'div', classes: ['overlay'] });
  const popup = createElement({ tag: 'div', classes: ['popup'] });
  const popupContent = createElement({ tag: 'div', classes: ['popup-content'] });
  const buttonContainer = createElement({ tag: 'div', classes: ['popup-buttons'] });

  typeof content === 'string' ? (popupContent.textContent = content) : popupContent.append(content);

  buttons.forEach(({ text, onClick }) => {
    if (!(popupWrapper instanceof HTMLDivElement)) return;
    buttonContainer.append(
      createButton(text, () => onClick(popupWrapper, content instanceof HTMLTextAreaElement ? content : undefined))
    );
  });

  popup.append(popupContent, buttonContainer);
  popupWrapper.append(popup);
  document.body.appendChild(popupWrapper);
  document.body.style.overflow = 'hidden';

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') popupWrapper.remove();
  };
  const handleBodyClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLDivElement && !popup.contains(event.target)) {
      popupWrapper.remove();
    }
  };

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleBodyClick);

  onElementRemoved(popupWrapper, () => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleBodyClick);
    document.body.style.overflow = '';
  });

  return popupWrapper;
};
