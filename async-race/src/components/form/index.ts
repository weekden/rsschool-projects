import { GarageModel } from '../garage/model';
import { FormController } from './controller';
import { FormView } from './view';

export class InitForm {
  public init(): HTMLElement {
    const view = new FormView();
    const model = new GarageModel();
    new FormController(view, model);
    return view.render();
  }
}
