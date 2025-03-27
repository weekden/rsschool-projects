import type { NavController } from '../controller';

export class NavView {
  private navContainer: HTMLElement;

  constructor(private controller: NavController) {
    this.navContainer = document.createElement('nav');
  }

  public render(): HTMLElement {
    const button1 = document.createElement('button');
    button1.textContent = 'to Garage';
    button1.dataset.route = '/';

    const button2 = document.createElement('button');
    button2.textContent = 'to Winners';
    button2.dataset.route = '/records';

    this.navContainer.append(button1, button2);

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
