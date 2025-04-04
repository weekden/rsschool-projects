import { GarageModel } from '../../../models/garageModel';
import { GarageView } from '../view';
import { GarageAPI } from '../../../API/garageAPI';
import { getCarElements } from '../../../utils/dom/getCarElement';
import { animateRaceCar, animateStopCar, setCarsToStart } from '../../../utils/animation/animatioCar';
import { EngineState } from '../../../types';

export class GarageController {
  constructor(
    private readonly view: GarageView,
    private readonly model: GarageModel
  ) {
    this.initEventListeners();
    this.model.setGarage(this.view.garage);
    this.model.subscribeCarsListener(() => this.handleModelUpdateCarsList());
    this.model.subscribeRaceSingleStateListener(() => this.handleUpdateControlButtons());
    this.model.subscribeRaceTotalStateListener(() => this.handleUpdateAllControlButtons());
    this.model.subscribeWinnerListener(() => this.handleUpdateModelWinners());
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
    const garageContainer = this.view.garage;
    garageContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const carItem = target.closest('.garage-item');
        const carId = carItem?.getAttribute('data-id');
        if (!carId) {
          return;
        }

        if (target.classList.contains('btn-select')) {
          this.model.setCarToEdit(carId);
        } else if (target.classList.contains('btn-remove')) {
          this.deleteCar(carId);
          this.model.removeCar(carId);
        } else if (target.classList.contains('btn-start')) {
          this.model.setCarId(carId);
          this.controlStateEngineCar(carId, 'started');
        } else if (target.classList.contains('btn-stop')) {
          this.model.setCarId(carId);
          this.controlStateEngineCar(carId, 'stopped');
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

  private async controlStateEngineCar(id: string, engineState: EngineState): Promise<void> {
    const distance = this.model.getTrackWidth();
    try {
      const engineStatus = await GarageAPI.toggleEngine(id, engineState);
      const distanceTime = engineStatus.distance / engineStatus.velocity;

      const garage = this.model.getGarage();

      if (garage) {
        const garageItems = Array.from(garage.children);
        const carsElements = getCarElements(garageItems);
        const targetCar = carsElements.find((car) => car.getAttribute('data-id') === id);

        if (targetCar instanceof HTMLElement) {
          if (engineState === 'started') {
            this.model.setSingleRaceState(id, true);
            animateRaceCar(targetCar, distanceTime, distance);
            try {
              if (!this.model.getSingleRaceState(id)) {
                animateStopCar(targetCar);
                return;
              }

              const driveModeResponse = await GarageAPI.switchToDriveMode(id, 'drive');
              if (!driveModeResponse.success || !this.model.getSingleRaceState(id)) {
                animateStopCar(targetCar);
                return;
              }
            } catch {
              animateStopCar(targetCar);
            }
          } else if (engineState === 'stopped') {
            this.model.setSingleRaceState(id, false);
            setCarsToStart(targetCar);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdateCarsList(): void {
    this.view.renderCars();
  }

  private handleUpdateControlButtons(): void {
    this.view.updateControllButtons();
  }

  private handleUpdateAllControlButtons(): void {
    this.view.updateAllControlButtons();
  }

  private handleUpdateModelWinners(): void {
    this.view.showWinner();
  }
}
