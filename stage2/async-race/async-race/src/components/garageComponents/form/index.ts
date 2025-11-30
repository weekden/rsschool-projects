import { GarageModel } from '../../../models/garageModel';
import { AppModel } from '../../../models/appModel';
import { FormController } from './controller';
import { FormView } from './view';

export class InitForm {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel
  ) {}
  public init(): HTMLElement {
    const view = new FormView(this.model);
    new FormController(this.appModel, this.model, view);
    return view.render();
  }
}
