import { createButton } from '../../utils/dom/button';
import { createElement } from '../../utils/dom/customElement';
import { onElementRemoved } from '../../utils/observer/elementObserver';

export function createPopup(message: string, isButton: boolean = true): HTMLElement {
  const popupWrapper = createElement({ tag: 'div', classes: ['overlay'] });
  const popup = createElement({ tag: 'div', classes: ['popup'] });
  const popupContent = createElement({ tag: 'div', text: message, classes: ['popup-content'] });
  const button = createButton({ text: 'OK', classes: ['btn', 'popup-btn'] });

  isButton ? popup.append(popupContent, button) : popup.append(popupContent);
  popupWrapper.append(popup);
  document.body.append(popupWrapper);
  document.body.style.overflow = 'hidden';

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') popupWrapper.remove();
  };

  const handleBodyClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLDivElement && !popup.contains(event.target)) {
      popupWrapper.remove();
    }
  };

  const handleButtonClick = (): void => {
    popupWrapper.remove();
  };

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleBodyClick);
  button.addEventListener('click', handleButtonClick);

  onElementRemoved(popupWrapper, () => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleBodyClick);
    button.removeEventListener('click', handleButtonClick);
    document.body.style.overflow = '';
  });
  return popupWrapper;
}
