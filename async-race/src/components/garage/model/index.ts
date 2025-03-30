import type { Car } from '../../../types';
export class GarageModel {
  private cars: Car[] = [];

  public setCars(cars: Car[]): void {
    console.log(cars);
    this.cars = cars;
  }

  public getCars(): Car[] {
    return this.cars;
  }

  public addCar(car: Car): void {
    this.cars.push(car);
  }

  public removeCar(id: string): void {
    this.cars = this.cars.filter((car) => car.id !== Number(id));
  }
}
