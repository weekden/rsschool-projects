import { createButton } from '../utils/dom/button';
import { createElement } from '../utils/dom/customElement';

export class NotFoundPage {
  public render(): HTMLElement {
    const buttonBack = createButton({ text: 'back', classes: ['btn'] });
    buttonBack.addEventListener('click', () => history.back());
    const container = createElement({
      tag: 'div',
      classes: ['page-error'],
      children: [
        createElement({
          tag: 'p',
          text: '404 - Page Not Found',
          classes: ['page-error__text'],
        }),
        buttonBack,
      ],
    });
    return container;
  }
}
