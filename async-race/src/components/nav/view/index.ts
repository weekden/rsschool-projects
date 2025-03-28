import type { NavController } from '../controller';
import { createButton } from '../../../utils/dom/createButton';
import { createElement } from '../../../utils/dom/createElement';

export class NavView {
  private navContainer: HTMLElement;

  constructor(private controller: NavController) {
    this.navContainer = createElement({ tag: 'nav', classes: ['nav'] });
  }

  public render(): HTMLElement {
    const buttonGarage = createButton({ text: 'to Garage', classes: ['nav_btn', 'button'] });
    buttonGarage.dataset.route = '/';

    const buttonWinners = createButton({ text: 'to Winners', classes: ['nav_btn', 'button'] });
    buttonWinners.dataset.route = '/records';

    this.navContainer.append(buttonGarage, buttonWinners);

    Array.from(this.navContainer.children).forEach((item) => {
      if (item instanceof HTMLElement) {
        item.addEventListener('click', () => {
          const route = item.dataset.route;
          if (route) {
            this.controller.navigate(route);
          }
        });
      }
    });
    return this.navContainer;
  }
}
