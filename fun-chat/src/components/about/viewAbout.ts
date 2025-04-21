import { createElement } from '../../utils/dom/customElement';
import { createButton } from '../../utils/dom/button';
import { createAnchorElement } from '../../utils/dom/anchor';

export class AboutView {
  private backButton: HTMLButtonElement;

  constructor() {
    this.backButton = createButton({
      text: 'Go Back',
      classes: ['btn'],
    });
  }

  public render(): HTMLElement {
    const title = createElement({
      tag: 'h2',
      text: 'Fun Chat',
      classes: ['about-title'],
    });

    const description = createElement({
      tag: 'p',
      text: 'Приложение разработано для демонстрации задания Fun Chat в рамках курса RSSchool JS/FE 2023Q3',
    });

    const author = createAnchorElement({
      href: 'https://github.com/weekden',
      text: 'Denis Nedelko',
      classes: ['about-author'],
      target: '_blank',
    });

    const container = createElement({
      tag: 'div',
      classes: ['about-container'],
      children: [title, description, author, this.backButton],
    });

    return container;
  }

  public getBackButton(): HTMLButtonElement {
    return this.backButton;
  }
}
