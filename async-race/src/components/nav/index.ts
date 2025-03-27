import { NavModel } from './model';
import { NavController } from './controller';
import { NavView } from './view';

export class InitNav {
  public init(): HTMLElement {
    const model = new NavModel();
    const controller = new NavController(model);
    return new NavView(controller).render();
  }
}
