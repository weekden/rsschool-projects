import { createButton } from '../utils/createButton';
import { createElement } from '../utils/helpers/createElement';
export class ErrorPage {
  public render(): HTMLElement {
    const container = createElement({
      tag: 'div',
      classes: ['page-error'],
      children: [
        createButton('Back', () => {
          location.hash = '/';
        }),
        createElement({
          tag: 'p',
          text: '404 - Page Not Found',
          classes: ['page-error__text'],
        }),
      ],
    });
    return container;
  }
}
