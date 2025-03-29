import { GarageModel } from './model';
import { GarageController } from './controller';
import { GarageView } from './view';

export class InitGarage {
  public async init(): Promise<HTMLElement> {
    const model = new GarageModel();
    const controller = new GarageController(model);
    await controller.getCars();
    return new GarageView(model).render();
  }
}
