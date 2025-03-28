import { createElement } from '../../../utils/dom/createElement';
import { createGarageItem } from '../items/garageItem';
export class GarageView {
  private garageContainer: HTMLElement;

  constructor() {
    this.garageContainer = createElement({ tag: 'div', classes: ['garage-wrapper'] });
  }

  public render(): HTMLElement {
    const carItem = createGarageItem({ model: 'BMW', color: 'yellow' });
    this.garageContainer.append(carItem);
    return this.garageContainer;
  }
}
