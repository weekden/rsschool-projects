import type { Car, CreateCarParameters, GaragePage } from '../types';
const URL = 'http://localhost:3000/garage';
export class GarageAPI {
  public static async loadGarage(page: number = 1, limit: number = 7): Promise<GaragePage> {
    try {
      const response = await fetch(`${URL}?_page=${page}&_limit=${limit}`);
      const cars: Car[] = await response.json();
      const totalCount = Number(response.headers.get('X-Total-Count')) || 0;

      return { cars, totalCount };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async createCar(car: CreateCarParameters): Promise<Car> {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    return response.json();
  }

  public static async updateCar(car: Car): Promise<Car> {
    const response = await fetch(`${URL}/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    return response.json();
  }

  public static async deleteCar(id: string): Promise<string> {
    const response = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  public static async generateCars(cars: CreateCarParameters[]): Promise<Car[]> {
    const responses = await Promise.all(
      cars.map(async (car) => {
        const response = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(car),
        });
        return response.json();
      })
    );
    return responses;
  }
}
