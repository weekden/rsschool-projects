import { GarageModel } from '../model';

export class GarageController {
  constructor(private model: GarageModel) {}

  public async getCars(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/garage');
      const cars = await response.json();
      this.model.setCars(cars);
      console.log(cars);
    } catch (error) {
      console.error(error);
    }
  }
}
