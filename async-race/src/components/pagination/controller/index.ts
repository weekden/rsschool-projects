import { PaginationView } from '../view';
import { GarageModel } from '../../../models/garageModel';
import { AppModel } from '../../../models/appModel';

export class PaginationController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel,
    private readonly view: PaginationView
  ) {
    this.appModel.subscribePagesListener(() => this.updateButtonState());
    this.model.subscribeCarsListener(() => this.updateButtonState());
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.buttonPrew.addEventListener('click', () => this.handleDecrease());
    this.view.buttonNext.addEventListener('click', () => this.handleIncrease());
  }

  private handleDecrease(): void {
    this.appModel.decreasePageCounter();
  }

  private handleIncrease(): void {
    this.appModel.increasePageCounter();
  }

  private updateButtonState(): void {
    this.view.updateButtons();
  }
}
