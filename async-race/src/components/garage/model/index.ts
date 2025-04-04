import type { Car, CreateCarParameters } from '../../../types';
import { generateColor } from '../../../utils/colorRandomizer';
import { generateCarName } from '../../../utils/carNameRandomizer';

export class GarageModel {
  public readonly carList = [
    { brand: 'Toyota', model: 'Camry' },
    { brand: 'Honda', model: 'Accord' },
    { brand: 'Ford', model: 'Mustang' },
    { brand: 'Chevrolet', model: 'Camaro' },
    { brand: 'BMW', model: 'M3' },
    { brand: 'Mercedes-Benz', model: 'C-Class' },
    { brand: 'Audi', model: 'A4' },
    { brand: 'Lexus', model: 'RX' },
    { brand: 'Tesla', model: 'Model S' },
    { brand: 'Porsche', model: '911' },
    { brand: 'Volkswagen', model: 'Golf' },
    { brand: 'Nissan', model: 'GT-R' },
    { brand: 'Subaru', model: 'Impreza' },
    { brand: 'Mazda', model: 'CX-5' },
    { brand: 'Hyundai', model: 'Sonata' },
    { brand: 'Kia', model: 'Sportage' },
    { brand: 'Jeep', model: 'Wrangler' },
    { brand: 'Dodge', model: 'Charger' },
    { brand: 'Volvo', model: 'XC90' },
    { brand: 'Ferrari', model: 'F8 Tributo' },
  ];
  private readonly coinCarsAtPage: number = 7;
  private cars: Car[] = Array.from({ length: this.coinCarsAtPage });
  private carToEdit: Car | null = null;
  private coinCars: number = 0;
  private page: number = 1;
  private trackWidth: number = 0;
  private garageElement: HTMLElement | undefined;
  private isRaceTotal: boolean = false;
  private raceStates: { [carId: string]: boolean } = {};
  private carId: string = '';

  private carsToEditListeners: (() => void) | null = null;
  private carsListeners: (() => void)[] = [];
  private pagesListener: (() => void)[] = [];
  private raceTotalStateListener: (() => void)[] = [];
  private raceSingleStateListener: (() => void)[] = [];

  public setCars(cars: Car[]): void {
    if (cars.length > this.coinCarsAtPage) {
      this.cars = cars.slice(0, this.coinCarsAtPage);
    } else {
      this.cars = cars;
    }
    this.notifyCarsListener();
  }

  public getCarToEdit(): Car | null {
    return this.carToEdit;
  }

  public setCarToEdit(id: Car['id']): void {
    const foundCar = this.cars.find((item) => item.id.toString() === id);
    if (foundCar) {
      this.carToEdit = foundCar;
    }
    this.notifyCarsToEditListener();
  }

  public getCars(): Car[] {
    return this.cars;
  }

  public addCar(car: Car): void {
    if (this.cars.length < this.coinCarsAtPage) {
      this.cars.push(car);
    }

    this.coinCars++;
    this.notifyCarsListener();
  }

  public removeCar(id: string): void {
    this.cars = this.cars.filter((car) => car.id !== id);
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
      name: generateCarName(this.carList),
      color: generateColor(),
    }));
    return hudredCarsArray;
  }

  public getTrackWidth(): number {
    return this.trackWidth;
  }

  public setTrackWidth(width: number): void {
    this.trackWidth = width;
  }

  public setGarage(element: HTMLElement): void {
    this.garageElement = element;
  }

  public getGarage(): HTMLElement | null {
    return this.garageElement instanceof HTMLElement ? this.garageElement : null;
  }

  public setTotalRaceState(state: boolean): void {
    this.isRaceTotal = state;
    this.notifyRaceTotalStateListener();
  }

  public getTotalRaceState(): boolean {
    return this.isRaceTotal;
  }

  public setSingleRaceState(carId: string, state: boolean): void {
    this.raceStates[carId] = state;
    this.notifyRaceSingleStateListener();
  }

  public getSingleRaceState(carId: string): boolean {
    return this.raceStates[carId] ?? false;
  }

  public setCarId(id: string): void {
    this.carId = id;
  }

  public getCarId(): string {
    return this.carId;
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

  public subscribeRaceTotalStateListener(callback: () => void): void {
    this.raceTotalStateListener.push(callback);
  }

  public subscribeRaceSingleStateListener(callback: () => void): void {
    this.raceSingleStateListener.push(callback);
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

  private notifyRaceTotalStateListener(): void {
    this.raceTotalStateListener.forEach((callback) => callback());
  }

  private notifyRaceSingleStateListener(): void {
    this.raceSingleStateListener.forEach((callback) => callback());
  }
}
