import { GarageModel } from '../../garage/model';
import { FormView } from '../view';
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
  }

  private async handleCreate(): Promise<void> {
    const name = this.view.textInputCreate.value;
    const color = this.view.colorInputCreate.value;
    if (!name) return;

    const newCarData: CreateCarParameters = { name, color };

    try {
      const response = await fetch('http://localhost:3000/garage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCarData),
      });
      const newCar: Car = await response.json();
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
    if (!name || !id) return;

    const updateCarData: CreateCarParameters = { name, color };

    try {
      const response = await fetch(`http://localhost:3000/garage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateCarData),
      });
      const updateCar: Car = await response.json();
      this.model.updateCar(updateCar);
      this.clearInputs();
    } catch (error) {
      console.error(error);
    }
  }

  private async handleGenerate(): Promise<void> {
    const oneHundredArray: CreateCarParameters[] = this.model.createHundredCars();
    try {
      const newHundred: Car[] = await Promise.all(
        oneHundredArray.map(async (car) => {
          const response = await fetch('http://localhost:3000/garage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
          });
          return response.json();
        })
      );

      this.model.setCars([...this.model.getCars(), ...newHundred]);
      this.model.setCarsCount(this.model.getCarsCount() + newHundred.length);
      this.loadGarage();
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdate(): void {
    this.view.updateInputs();
  }

  private clearInputs(): void {
    this.view.textInputCreate.value = '';
    this.view.colorInputCreate.value = '#ffffff';
    this.view.textInputUpdate.value = '';
    this.view.colorInputUpdate.value = '#ffffff';
  }

  private async loadGarage(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/garage');

      const cars = await response.json();
      // this.model.setCars(cars);
      // this.model.setCarsCount(cars.length);
      console.log(cars);
    } catch (error) {
      console.error(error);
    }
  }
}
