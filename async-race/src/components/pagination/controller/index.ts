import { PaginationView } from '../view';
import { GarageModel } from '../../../models/garageModel';
import type { Car } from '../../../types';

export class PaginationController {
  constructor(
    private readonly view: PaginationView,
    private readonly model: GarageModel
  ) {
    this.model.subscribePagesListener(() => this.updateButtonState());
    this.model.subscribeCarsListener(() => this.updateButtonState());
    this.initEventListeners();
    this.loadPage();
  }

  private initEventListeners(): void {
    this.view.buttonPrew.addEventListener('click', () => this.handleDecrease());
    this.view.buttonNext.addEventListener('click', () => this.handleIncrease());
  }

  private handleDecrease(): void {
    this.model.decreasePageCounter();
    const page = this.model.getPageNumber();
    this.loadPage(page);
  }

  private handleIncrease(): void {
    this.model.increasePageCounter();
    const page = this.model.getPageNumber();
    this.loadPage(page);
  }

  private updateButtonState(): void {
    this.view.updateButtons();
  }

  private async loadPage(page: number = 1, limit: number = 7): Promise<void> {
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
}
