import type { Car } from '../../../types';

export class GarageModel {
  public carList: string[] = [
    'Toyota Camry',
    'Honda Accord',
    'Ford Mustang',
    'Chevrolet Camaro',
    'BMW M3',
    'Mercedes-Benz C-Class',
    'Audi A4',
    'Lexus RX',
    'Tesla Model S',
    'Porsche 911',
    'Volkswagen Golf',
    'Nissan GT-R',
    'Subaru Impreza',
    'Mazda CX-5',
    'Hyundai Sonata',
    'Kia Sportage',
    'Jeep Wrangler',
    'Dodge Charger',
    'Volvo XC90',
    'Ferrari F8 Tributo',
  ];
  private cars: Car[] = [];
  private carToEdit: Car | null = null;
  private coinCars: number = 0;

  private carsToEditListeners: (() => void) | null = null;
  private carsListeners: (() => void)[] = [];

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
    this.coinCars++;
    this.notifyCarsListener();
  }

  public removeCar(id: string): void {
    this.cars = this.cars.filter((car) => car.id !== +id);
    this.coinCars--;
    this.notifyCarsListener();
  }

  public updateCar(updatedCar: Car): void {
    this.cars = this.cars.map((car) => (car.id === updatedCar.id ? updatedCar : car));
    this.notifyCarsListener();
  }

  public setCarsCount(coin: number): void {
    this.coinCars = coin;
  }

  public getCarsCount(): number {
    return this.coinCars;
  }

  public subscribeCarsListener(callback: () => void): void {
    this.carsListeners.push(callback);
  }

  public subscribeCarsToEditListener(callback: () => void): void {
    this.carsToEditListeners = callback;
  }

  private notifyCarsListener(): void {
    this.carsListeners.forEach((callback) => callback());
  }

  private notifyCarsToEditListener(): void {
    if (this.carToEdit && this.carsToEditListeners) {
      this.carsToEditListeners();
    }
  }
}
