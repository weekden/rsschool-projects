import type { Car } from '../../../types';

export class GarageModel {
  private cars: Car[] = [];
  private carToEdit: Car | null = null;

  private carsListener: (() => void) | null = null;
  private carsToEditListeners: (() => void) | null = null;

  public setCars(cars: Car[]): void {
    this.cars = cars;
  }

  public getCarToEdit(): Car | null {
    return this.carToEdit;
  }

  public setCarToEdit(id: Car['id']): void {
    const foundCar = this.cars.find((item) => item.id === id);
    if (foundCar) {
      this.carToEdit = foundCar;
    }
    this.notifyCarsToEditListener();
  }

  public getCars(): Car[] {
    return this.cars;
  }

  public addCar(car: Car): void {
    this.cars.push(car);
    this.notifyCarsListener();
  }

  public removeCar(id: string): void {
    this.cars = this.cars.filter((car) => car.id !== +id);
    this.notifyCarsListener();
  }

  public subscribeCarsListener(callback: () => void): void {
    this.carsListener = callback;
  }

  public subscribeCarsToEditListener(callback: () => void): void {
    this.carsToEditListeners = callback;
  }

  private notifyCarsListener(): void {
    if (this.cars && this.carsListener) {
      this.carsListener();
    }
  }

  private notifyCarsToEditListener(): void {
    if (this.carToEdit && this.carsToEditListeners) {
      this.carsToEditListeners();
    }
  }
}
