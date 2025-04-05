import { PaginationView } from '../view';
import { GarageModel } from '../../../models/garageModel';
import { AppModel } from '../../../models/appModel';
import type { Car } from '../../../types';

export class PaginationController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel,
    private readonly view: PaginationView
  ) {
    this.appModel.subscribePagesListener(() => {
      this.updateButtonState();
      this.loadPage();
    });

    this.model.subscribeCarsListener(() => this.updateButtonState());

    this.initEventListeners();
  }

  public init(): void {
    this.loadPage();
  }

  private initEventListeners(): void {
    this.view.buttonPrew.addEventListener('click', () => this.handleDecrease());
    this.view.buttonNext.addEventListener('click', () => this.handleIncrease());
  }

  private async loadPage(page: number = this.appModel.getPageNumber(), limit: number = 7): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=${limit}`);
      const cars: Car[] = await response.json();
      const totalCount = response.headers.get('X-Total-Count');

      this.model.setCars(cars);

      if (totalCount) {
        this.model.setCarsCount(+totalCount);
      }
    } catch (error) {
      console.error(error);
    }
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
