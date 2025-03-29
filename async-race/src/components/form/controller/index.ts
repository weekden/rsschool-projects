import { GarageModel } from '../../garage/model';
import { FormView } from '../view';

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
    const newCar = {
      name: name,
      color: color,
    };
    try {
      const response = await fetch('http://localhost:3000/garage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });

      const newCar = await response.json();
      console.log(newCar);
      this.model.addCar(newCar);
    } catch {}

    console.log(newCar);
  }
}
