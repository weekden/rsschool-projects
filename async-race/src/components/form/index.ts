import { FormController } from './controller';
import { FormView } from './view';

export class InitForm {
  public init(): HTMLElement {
    const view = new FormView();
    new FormController(view);
    return view.render();
  }
}
