import { GarageModel } from '../../garage/model';
import { FormView } from '../view';
import { GarageAPI } from '../../../API/garageAPI';
import { Car, CreateCarParameters } from '../../../types';

export class FormController {
  constructor(
    private view: FormView,
    private model: GarageModel
  ) {
    this.initEventListeners();
    this.model.subscribeCarsToEditListener(() => this.handleModelUpdate());
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
      // this.loadGarage();
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdate(): void {
    this.view.updateInputs();
  }

  private async handleRace(): Promise<void> {
    try {
      const cars = await GarageAPI.getCars();
      const engineStates = await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'started')));
      const carsSpeedsArray = engineStates.map((item) => item.distance / item.velocity);
      console.log(carsSpeedsArray);
    } catch (error) {
      console.error(error);
    }
  }

  private async handleReset(): Promise<void> {
    const cars = await GarageAPI.getCars();
    const engineStates = await Promise.all(cars.map((car) => GarageAPI.toggleEngine(car.id, 'stopped')));
    console.log(engineStates);
  }

  private clearInputs(): void {
    this.view.textInputCreate.value = '';
    this.view.colorInputCreate.value = '#ffffff';
    this.view.textInputUpdate.value = '';
    this.view.colorInputUpdate.value = '#ffffff';
  }
}
