import type { Car, CreateCarParameters } from '../../../types';
import { generateColor } from '../../../utils/colorRandomizer';

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
  private page: number = 1;

  private carsToEditListeners: (() => void) | null = null;
  private carsListeners: (() => void)[] = [];
  private pagesListener: (() => void)[] = [];

  public setCars(cars: Car[]): void {
    this.cars = cars;
    this.notifyCarsListener();
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
    this.notifyCarsListener();
  }

  public getCarsCount(): number {
    return this.coinCars;
  }

  public setPageNumber(_page: number): void {
    this.page = _page;
    this.notifyPagesListener();
  }

  public getPageNumber(): number {
    return this.page;
  }

  public decreasePageCounter(): void {
    this.page--;
    this.notifyPagesListener();
  }

  public increasePageCounter(): void {
    this.page++;
    this.notifyPagesListener();
  }

  public createHundredCars(): CreateCarParameters[] {
    const hudredCarsArray: CreateCarParameters[] = Array.from({ length: 100 }, () => ({
      name: this.carList[Math.floor(Math.random() * this.carList.length)],
      color: generateColor(),
    }));
    return hudredCarsArray;
  }

  public subscribeCarsListener(callback: () => void): void {
    this.carsListeners.push(callback);
  }

  public subscribeCarsToEditListener(callback: () => void): void {
    this.carsToEditListeners = callback;
  }

  public subscribePagesListener(callback: () => void): void {
    this.pagesListener.push(callback);
  }

  private notifyCarsListener(): void {
    this.carsListeners.forEach((callback) => callback());
  }

  private notifyCarsToEditListener(): void {
    if (this.carToEdit && this.carsToEditListeners) {
      this.carsToEditListeners();
    }
  }

  private notifyPagesListener(): void {
    this.pagesListener.forEach((callback) => callback());
  }
}
