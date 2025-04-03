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
    const stateRace = this.model.getRaceState();
    const selectedCarId = this.model.getCarId();
    const cars = this.model.getCars();
    if (!cars) return;
    cars.forEach((car) => {
      const carItem = selectedCarId ? createGarageItem(car, stateRace, selectedCarId) : createGarageItem(car);
      this.garageContainer.append(carItem);
    });
  }

  public removeCar(id: string): void {
    const removedElement = Array.from(this.garageContainer.children).find(
      (item) => item.getAttribute('data-id') === id
    );
    if (removedElement) {
      removedElement.remove();
    }
  }
}
