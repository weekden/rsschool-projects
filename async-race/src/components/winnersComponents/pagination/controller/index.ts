import { PaginationView } from '../view';
import { WinnersModel } from '../../../../models/winnersModel';
import { AppModel } from '../../../../models/appModel';

export class PaginationController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel,
    private readonly view: PaginationView
  ) {
    this.appModel.subscribePagesListener(() => this.updateButtonState());
    this.model.subscribeWinnersListener(() => this.updateButtonState());
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.buttonPrew.addEventListener('click', () => this.handleDecrease());
    this.view.buttonNext.addEventListener('click', () => this.handleIncrease());
  }

  private handleDecrease(): void {
    this.appModel.decreasePageCounter('winners');
  }

  private handleIncrease(): void {
    this.appModel.increasePageCounter('winners');
  }

  private updateButtonState(): void {
    this.view.updateButtons();
  }
}
