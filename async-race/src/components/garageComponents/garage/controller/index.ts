import { GarageModel } from '../../../../models/garageModel';
import { GarageView } from '../view';
import { AppModel } from '../../../../models/appModel';
import { GarageAPI } from '../../../../API/garageAPI';
import { getCarElements } from '../../../../utils/dom/getCarElement';
import { animateRaceCar, animateStopCar, setCarsToStart } from '../../../../utils/animation/animatioCar';
import type { Car, EngineState } from '../../../../types';

export class GarageController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel,
    private readonly view: GarageView
  ) {
    this.loadGarage();
    this.initEventListeners();
    this.model.setGarage(this.view.garage);
    this.model.subscribeCarsListener(() => this.handleModelUpdateCarsList());
    this.model.subscribeRaceSingleStateListener(() => this.handleUpdateControlButtons());
    this.model.subscribeRaceTotalStateListener(() => this.handleUpdateAllControlButtons());
    this.model.subscribeWinnerListener(() => this.handleUpdateModelWinners());
    this.appModel.subscribePagesListener(() => this.loadGarage());
  }

  private async loadGarage(page: number = this.appModel.getPageNumber('garage'), limit: number = 7): Promise<void> {
    this.model.clearWinners();
    try {
      this.model.setTotalRaceState(false);
      const response = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=${limit}`);
      const cars: Car[] = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      this.model.setCars(cars);
      if (totalCount) {
        this.model.setCarsCount(+totalCount);
      }
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
        if (!carItem) {
          return;
        }

        const carId = Number(carItem?.getAttribute('data-id'));
        if (!carId) {
          return;
        }

        if (target.classList.contains('btn-select')) {
          this.model.setCarToEdit(carId);
        } else if (target.classList.contains('btn-remove')) {
          this.deleteCar(carId);
          this.model.removeCar(+carId);
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
      this.appModel.setTrackWidth(trackWidth);
    });
    window.addEventListener('load', () => {
      const trackWidth = garageContainer.offsetWidth;
      this.appModel.setTrackWidth(trackWidth);
    });
  }

  private async deleteCar(id: number): Promise<void> {
    try {
      await GarageAPI.deleteCar(id);
      this.loadGarage();
    } catch (error) {
      console.error(error);
    }
  }

  private async controlStateEngineCar(id: number, engineState: EngineState): Promise<void> {
    try {
      const engineStatus = await GarageAPI.toggleEngine(id, engineState);
      const distanceTime = engineStatus.distance / engineStatus.velocity;

      const garage = this.model.getGarage();

      if (garage) {
        const garageItems = Array.from(garage.children);
        const carsElements = getCarElements(garageItems);
        const targetCar = carsElements.find((car) => Number(car.getAttribute('data-id')) === id);

        if (targetCar instanceof HTMLElement) {
          if (engineState === 'started') {
            this.model.setSingleRaceState(id, true);
            animateRaceCar(targetCar, distanceTime, this.appModel.getTrackWidth());
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
