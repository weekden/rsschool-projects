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
    this.view.updateButton;
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
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdate(): void {
    this.view.render();
  }
}
