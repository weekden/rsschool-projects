import { GarageModel } from '../model';
import { GarageView } from '../view';
import type { Car } from '../../../types';

export class GarageController {
  constructor(
    private readonly view: GarageView,
    private readonly model: GarageModel
  ) {
    this.initEventListeners();
    this.model.subscribeCarsListener(() => this.handleModelUpdate());
  }

  public async loadGarage(page: number = 1, limit: number = 7): Promise<void> {
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

  private initEventListeners(): void {
    const garageContainer = this.view.garageContainer;
    garageContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const carItem = target.closest('.garage-item');
        const carId = carItem?.getAttribute('data-id');
        if (!carId) return;

        if (target.classList.contains('btn-select')) {
          this.model.setCarToEdit(+carId);
        } else if (target.classList.contains('btn-remove')) {
          this.deleteCar(carId);
          this.model.removeCar(carId);
        } else if (target.classList.contains('btn-start')) {
        } else if (target.classList.contains('btn-stop')) {
        }
      }
    });
  }

  private async deleteCar(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/garage/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`error ${response.status}`);
      }
      this.loadGarage();
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdate(): void {
    this.view.renderCars();
  }
}
