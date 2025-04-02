import { GarageModel } from '../model';
import { GarageView } from '../view';
import { GarageAPI } from '../../../API/garageAPI';
import { getCarElements } from '../../../utils/dom/getCarElement';
import { animateRaceCar } from '../../../utils/animation/animatioCar';

export class GarageController {
  constructor(
    private readonly view: GarageView,
    private readonly model: GarageModel
  ) {
    this.initEventListeners();
    this.model.setGarage(this.view.garageContainer);
    this.model.subscribeCarsListener(() => this.handleModelUpdate());
  }

  public async loadGarage(page: number = 1, limit: number = 7): Promise<void> {
    try {
      const { cars, totalCount } = await GarageAPI.loadGarage(page, limit);
      this.model.setCars(cars);
      this.model.setCarsCount(totalCount);
    } catch (error) {
      console.error(error);
    }
  }

  private initEventListeners(): void {
    const garageContainer = this.view.garageContainer;
    garageContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const carItem = target.closest('.garage-item');
        const carId = carItem?.getAttribute('data-id');
        if (!carId) {
          return;
        }

        if (target.classList.contains('btn-select')) {
          this.model.setCarToEdit(+carId);
        } else if (target.classList.contains('btn-remove')) {
          this.deleteCar(carId);
          this.model.removeCar(carId);
        } else if (target.classList.contains('btn-start')) {
          this.runCar(carId);
        } else if (target.classList.contains('btn-stop')) {
        }
      }
    });
    window.addEventListener('resize', () => {
      const trackWidth = garageContainer.offsetWidth;
      this.model.setTrackWidth(trackWidth);
    });
    window.addEventListener('load', () => {
      const trackWidth = garageContainer.offsetWidth;
      this.model.setTrackWidth(trackWidth);
    });
  }

  private async deleteCar(id: string): Promise<void> {
    try {
      await GarageAPI.deleteCar(id);
      this.loadGarage();
    } catch (error) {
      console.error(error);
    }
  }

  private async runCar(id: string): Promise<void> {
    const distance = this.model.getTrackWidth();
    try {
      const engineStates = await GarageAPI.toggleEngine(+id, 'started');
      const distanceTime = engineStates.distance / engineStates.velocity;
      const garage = this.model.getGarage();

      if (garage) {
        const garageItems = Array.from(garage.children);
        const carsElements = getCarElements(garageItems);
        const targetCar = carsElements.find((car) => car.getAttribute('data-id') === id);

        if (targetCar instanceof HTMLElement) {
          animateRaceCar(targetCar, distanceTime, distance);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdate(): void {
    this.view.renderCars();
  }
}
