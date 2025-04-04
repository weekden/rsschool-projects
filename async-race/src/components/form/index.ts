import { GarageModel } from '../../models/garageModel';
import { FormController } from './controller';
import { FormView } from './view';

export class InitForm {
  constructor(private model: GarageModel) {}
  public init(): HTMLElement {
    const view = new FormView(this.model);
    new FormController(view, this.model);
    return view.render();
  }
}
