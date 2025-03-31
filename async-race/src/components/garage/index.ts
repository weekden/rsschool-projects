import { GarageModel } from './model';
import { GarageController } from './controller';
import { GarageView } from './view';

export class InitGarage {
  constructor(private model: GarageModel) {}

  public async init(): Promise<HTMLElement> {
    const view = new GarageView(this.model);
    const controller = new GarageController(view, this.model);
    await controller.loadGarage();

    return view.render();
  }
}
