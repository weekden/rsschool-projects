import { CountView } from './view';
import { CountController } from './controller';
import { GarageModel } from '../../models/garageModel';
import { AppModel } from '../../models/appModel';

export class InitCount {
  private view: CountView;
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel
  ) {
    this.view = new CountView(this.appModel, this.model);
    new CountController(this.appModel, this.model, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
