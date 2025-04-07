import { GarageModel } from '../../../../models/garageModel';
import { AppModel } from '../../../../models/appModel';
import { FormView } from '../view';
import { GarageAPI } from '../../../../API/garageAPI';
import { WinnerApi } from '../../../../API/winnersApi';
import { Car, CreateCarParameters, WinnerItem } from '../../../../types';
import { animateRaceCar, setCarsToStart, animateStopCar } from '../../../../utils/animation/animatioCar';
import { getCarElements } from '../../../../utils/dom/getCarElement';

export class FormController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel,
    private readonly view: FormView
  ) {
    this.initEventListeners();
    this.model.subscribeCarsToEditListener(() => this.handleModelUpdateUpdateInputs());
    this.model.subscribeRaceTotalStateListener(() => this.handleModelUpdateControlButtons());
  }

  private initEventListeners(): void {
    this.view.createButton.addEventListener('click', () => this.handleCreate());
    this.view.updateButton.addEventListener('click', () => {
      this.handleUpdate();
      this.view.enableDisabledUpdateInputs();
    });
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
      this.model.setCars([...this.model.getCars(), ...newHundredCars]);
      this.model.setCarsCount(this.model.getCarsCount() + newHundredCars.length);
    } catch (error) {
      console.error(error);
    }
  }

  private async handleRace(): Promise<void> {
    const distance = this.appModel.getTrackWidth();
    this.model.clearWinners();
    try {
      const cars = this.model.getCars();
      const engineStates = await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'started')));
      const carsTimesArray = engineStates.map((item) => item.distance / item.velocity);
      const garage = this.model.getGarage();

      if (garage) {
        const garageItems = Array.from(garage.children);
        const carsElements = getCarElements(garageItems);
        this.model.setTotalRaceState(true);

        const race = carsElements.map(async (item, index) => this.runCar(item, carsTimesArray[index], distance));
        const winner = await Promise.any(race);
        if (winner) {
          const win = 1;
          this.model.setWinner(winner);
          winner.wins = win;
          WinnerApi.saveWinner(winner);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async runCar(carElement: Element, time: number, distance: number): Promise<WinnerItem | undefined> {
    const carId = Number(carElement.getAttribute('data-id'));
    const id = carId;

    if (!(carElement instanceof HTMLElement) || !carId) return;

    animateRaceCar(carElement, time, distance);

    try {
      if (!this.model.getTotalRaceState()) {
        animateStopCar(carElement);
        return;
      }

      const driveModeResponse = await GarageAPI.switchToDriveMode(id, 'drive');

      if (!driveModeResponse.success || !this.model.getTotalRaceState()) {
        animateStopCar(carElement);
        return;
      }

      return { id, time };
    } catch {
      animateStopCar(carElement);
      throw new Error('Car crashed');
    }
  }

  private async handleReset(): Promise<void> {
    this.model.clearWinners();
    const garage = this.model.getGarage();
    const cars = this.model.getCars();
    this.model.setTotalRaceState(false);

    if (!garage) {
      return;
    }

    const garageItems = Array.from(garage.children);
    const carsElements = getCarElements(garageItems);

    carsElements.forEach((carElement) => {
      if (carElement instanceof HTMLElement) {
        setCarsToStart(carElement);
      }
    });

    await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'stopped')));
  }

  private handleModelUpdateUpdateInputs(): void {
    this.view.updateUpdatesInputs();
  }

  private handleModelUpdateControlButtons(): void {
    this.view.updateControlButtons();
  }

  private clearInputs(): void {
    this.view.textInputCreate.value = '';
    this.view.colorInputCreate.value = '#ffffff';
    this.view.textInputUpdate.value = '';
    this.view.colorInputUpdate.value = '#ffffff';
  }
}
