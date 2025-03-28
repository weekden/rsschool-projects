import type { FormView } from '../view';
export class FormController {
  private view: FormView;

  constructor(view: FormView) {
    this.view = view;
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.createButton.addEventListener('click', () => this.handleCreate());
    this.view.updateButton.addEventListener('click', () => this.handleUpdate());
    this.view.raceButton.addEventListener('click', () => this.startRace());
    this.view.resetButton.addEventListener('click', () => this.resetRace());
    this.view.generateButton.addEventListener('click', () => this.generateCars());
  }

  private handleCreate(): void {
    const model = this.view.textInputCreate.value;
    const color = this.view.colorInputCreate.value;
    if (!model) return;
    const newCar = {
      model: model,
      color: color,
    };
    this.view.textInputCreate.value = '';
    console.log(newCar);
  }

  private handleUpdate(): void {
    const model = this.view.textInputUpdate.value;
    const color = this.view.colorInputUpdate.value;
    if (!model) return;
    const updateCar = {
      model: model,
      color: color,
    };
    this.view.textInputUpdate.value = '';
    console.log(updateCar);
  }

  private startRace(): void {}

  private resetRace(): void {}

  private generateCars(): void {}
}
