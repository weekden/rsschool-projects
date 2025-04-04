import { createElement } from '../../../utils/dom/createElement';
import { createGarageItem } from '../items/garageItem';
import { GarageModel } from '../../../models/garageModel';

export class GarageView {
  public garage: HTMLElement;
  public garageContainer: HTMLElement;
  private messageContainer: HTMLElement;

  constructor(private model: GarageModel) {
    this.garageContainer = createElement({ tag: 'div', classes: ['garage'] });
    this.garage = createElement({ tag: 'div', classes: ['garage-wrapper'] });
    this.messageContainer = createElement({ tag: 'p', classes: ['message-container'] });
    this.garageContainer.append(this.messageContainer, this.garage);
  }

  public render(): HTMLElement {
    return this.garageContainer;
  }

  public renderCars(): void {
    this.garage.innerHTML = '';
    const cars = this.model.getCars();
    if (!cars) return;
    cars.forEach((car) => {
      const carItem = createGarageItem(car);
      this.garage.append(carItem);
    });
  }

  public updateControllButtons(): void {
    const totalRaceState = this.model.getTotalRaceState();
    console.log(totalRaceState);
    const selectedCarId = this.model.getCarId();
    const stateRace = this.model.getSingleRaceState(selectedCarId);
    const targetItemControllWrapper = Array.from(this.garage.children).find(
      (item) => item.getAttribute('data-id') === selectedCarId
    )?.children[1];
    const buttonStart = targetItemControllWrapper?.children[0];
    const buttonStop = targetItemControllWrapper?.children[1];
    if (buttonStart instanceof HTMLButtonElement && buttonStop instanceof HTMLButtonElement) {
      if (stateRace) {
        buttonStart.disabled = true;
        buttonStop.disabled = false;
      } else {
        buttonStart.disabled = false;
        buttonStop.disabled = true;
      }
    }
  }

  public updateAllControlButtons(): void {
    const totalRaceState = this.model.getTotalRaceState();
    console.log(totalRaceState);

    Array.from(this.garage.children).forEach((item) => {
      const controlsWrapper = item.children[1];
      if (controlsWrapper instanceof HTMLElement) {
        const startButton = controlsWrapper.firstElementChild;
        const stopButton = controlsWrapper.lastElementChild;

        if (startButton instanceof HTMLButtonElement && stopButton instanceof HTMLButtonElement) {
          if (totalRaceState) {
            startButton.disabled = true;
            stopButton.disabled = false;
          } else {
            startButton.disabled = false;
            stopButton.disabled = true;
          }
        }
      }
    });
  }

  public showWinner(): void {
    const winner = this.model.getWinner();
    this.messageContainer.textContent = winner;
  }
}
