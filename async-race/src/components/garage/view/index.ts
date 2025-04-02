import { createElement } from '../../../utils/dom/createElement';
import { createGarageItem } from '../items/garageItem';
import { GarageModel } from '../model';

export class GarageView {
  public garageContainer: HTMLElement;

  constructor(private model: GarageModel) {
    this.garageContainer = createElement({ tag: 'div', classes: ['garage-wrapper'] });
  }

  public render(): HTMLElement {
    return this.garageContainer;
  }

  public renderCars(): void {
    this.garageContainer.innerHTML = '';
    const cars = this.model.getCars();
    if (!cars) return;
    cars.forEach((car) => {
      const carItem = createGarageItem(car);
      this.garageContainer.append(carItem);
    });
  }
}
