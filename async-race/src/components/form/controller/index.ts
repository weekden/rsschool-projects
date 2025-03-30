import { GarageModel } from '../../garage/model';
import { FormView } from '../view';
import { Car, CreateCarParameters } from '../../../types';

export class FormController {
  constructor(
    private view: FormView,
    private model: GarageModel
  ) {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.createButton.addEventListener('click', () => this.handleCreate());
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
      console.log(newCar);
      this.model.addCar(newCar);
    } catch (error) {
      console.error(error);
    }
  }
}
