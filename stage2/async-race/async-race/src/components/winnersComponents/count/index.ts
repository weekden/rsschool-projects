import { CountView } from './view';
import { CountController } from './controller';
import { AppModel } from '../../../models/appModel';

import { WinnersModel } from '../../../models/winnersModel';

export class InitCount {
  private view: CountView;
  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel
  ) {
    this.view = new CountView(this.appModel, this.model);
    new CountController(this.appModel, this.model, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
