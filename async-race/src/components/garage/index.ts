import { GarageModel } from './model';
import { GarageController } from './controller';
import { GarageView } from './view';

export class InitGarage {
  constructor(private model: GarageModel) {}

  public async init(): Promise<HTMLElement> {
    const controller = new GarageController(this.model);
    const view = new GarageView(this.model);
    await controller.getCars();

    return view.render();
  }
}
