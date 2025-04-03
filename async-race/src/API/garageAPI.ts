import type {
  Car,
  CreateCarParameters,
  GaragePageResponse,
  EngineResponse,
  EngineState,
  DriveResponse,
} from '../types';
const GARAGE_URL = 'http://localhost:3000/garage';
const ENGINE_URL = 'http://localhost:3000/engine';
export class GarageAPI {
  public static async loadGarage(page: number = 1, limit: number = 7): Promise<GaragePageResponse> {
    try {
      const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
      const cars: Car[] = await response.json();
      const totalCount = Number(response.headers.get('X-Total-Count')) || 0;

      return { cars, totalCount };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async createCar(car: CreateCarParameters): Promise<Car> {
    const response = await fetch(`${GARAGE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    return response.json();
  }

  public static async updateCar(car: Car): Promise<Car> {
    const response = await fetch(`${GARAGE_URL}/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    return response.json();
  }

  public static async deleteCar(id: string): Promise<string> {
    const response = await fetch(`${GARAGE_URL}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  public static async generateCars(cars: CreateCarParameters[]): Promise<Car[]> {
    const responses = await Promise.all(
      cars.map(async (car) => {
        const response = await fetch(GARAGE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(car),
        });
        return response.json();
      })
    );

    return responses;
  }

  public static async getCars(): Promise<Car[]> {
    const response = await fetch(GARAGE_URL, {
      method: 'GET',
    });

    return response.json();
  }

  public static async getCar(id: string): Promise<Car> {
    const response = await fetch(`${GARAGE_URL}/${id}`, {
      method: 'GET',
    });

    return response.json();
  }

  public static async toggleEngine(carId: string, status: EngineState): Promise<EngineResponse> {
    const response = await fetch(`${ENGINE_URL}?id=${carId}&status=${status}`, {
      method: 'PATCH',
    });

    return response.json();
  }

  public static async switchToDriveMode(carId: string, status: EngineState): Promise<DriveResponse> {
    const response = await fetch(`${ENGINE_URL}?id=${carId}&status=${status}`, {
      method: 'PATCH',
    });

    return response.json();
  }
}
