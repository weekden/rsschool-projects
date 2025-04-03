import { GarageModel } from '../../garage/model';
import { FormView } from '../view';
import { GarageAPI } from '../../../API/garageAPI';
import { Car, CreateCarParameters } from '../../../types';
import { animateRaceCar, setCarsToStart, animateStopCar } from '../../../utils/animation/animatioCar';
import { getCarElements } from '../../../utils/dom/getCarElement';

export class FormController {
  constructor(
    private view: FormView,
    private model: GarageModel
  ) {
    this.initEventListeners();
    this.model.subscribeCarsToEditListener(() => this.handleModelUpdateUpdateInputs());
    this.model.subscribeRaceTotalStateListener(() => this.handleModelUpdateControlButtons());
  }

  private initEventListeners(): void {
    this.view.createButton.addEventListener('click', () => this.handleCreate());
    this.view.updateButton.addEventListener('click', () => this.handleUpdate());
    this.view.generateButton.addEventListener('click', () => this.handleGenerate());
    this.view.raceButton.addEventListener('click', () => this.handleRace());
    this.view.resetButton.addEventListener('click', () => this.handleReset());
  }

  private async handleCreate(): Promise<void> {
    const name = this.view.textInputCreate.value;
    const color = this.view.colorInputCreate.value;
    if (!name) {
      return;
    }

    const newCarData: CreateCarParameters = { name, color };

    try {
      const newCar = await GarageAPI.createCar(newCarData);
      this.model.addCar(newCar);
      this.clearInputs();
    } catch (error) {
      console.error(error);
    }
  }

  private async handleUpdate(): Promise<void> {
    const name = this.view.textInputUpdate.value;
    const color = this.view.colorInputUpdate.value;
    const id = this.model.getCarToEdit()?.id;
    if (!name || !id) {
      return;
    }

    const updateCarData: Car = { name, color, id };

    try {
      const updateCar = await GarageAPI.updateCar(updateCarData);

      this.model.updateCar(updateCar);
      this.clearInputs();
    } catch (error) {
      console.error(error);
    }
  }

  private async handleGenerate(): Promise<void> {
    const oneHundredArray: CreateCarParameters[] = this.model.createHundredCars();
    try {
      const newHundredCars = await GarageAPI.generateCars(oneHundredArray);
      this.model.setCars(newHundredCars);
      this.model.setCarsCount(this.model.getCarsCount() + newHundredCars.length);
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdateUpdateInputs(): void {
    this.view.updateUpdatesInputs();
  }

  private handleModelUpdateControlButtons(): void {
    this.view.updateControlButtons();
  }

  private async handleRace(): Promise<void> {
    const distance = this.model.getTrackWidth();
    try {
      const cars = this.model.getCars();
      const engineStates = await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'started')));
      const carsTimesArray = engineStates.map((item) => item.distance / item.velocity);
      const garage = this.model.getGarage();
      if (garage) {
        const garageItems = Array.from(garage.children);
        const carsElements = getCarElements(garageItems);

        carsElements.forEach(async (carElement, index) => {
          const carId = carElement.getAttribute('data-id');
          if (carElement instanceof HTMLElement) {
            animateRaceCar(carElement, carsTimesArray[index], distance);
            try {
              if (carId) {
                const driveModeResponse = await GarageAPI.switchToDriveMode(carId, 'drive');

                if (!driveModeResponse.success) {
                  animateStopCar(carElement);
                }
              }
            } catch {
              animateStopCar(carElement);
            }
          }
        });
        this.model.setTotalRaceState(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async handleReset(): Promise<void> {
    const cars = this.model.getCars();
    await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'stopped')));

    const garage = this.model.getGarage();
    if (garage) {
      const garageItems = Array.from(garage.children);
      const carsElements = getCarElements(garageItems);

      carsElements.forEach((carElement) => {
        if (carElement instanceof HTMLElement) {
          setCarsToStart(carElement);
        }
      });
    }
    this.model.setTotalRaceState(false);
  }

  private clearInputs(): void {
    this.view.textInputCreate.value = '';
    this.view.colorInputCreate.value = '#ffffff';
    this.view.textInputUpdate.value = '';
    this.view.colorInputUpdate.value = '#ffffff';
  }
}
