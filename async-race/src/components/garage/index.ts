import { AppModel } from '../../models/appModel';
import { GarageModel } from '../../models/garageModel';
import { GarageController } from './controller';
import { GarageView } from './view';

export class InitGarage {
  private view: GarageView;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel
  ) {
    this.view = new GarageView(this.model);
    new GarageController(this.appModel, this.model, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
