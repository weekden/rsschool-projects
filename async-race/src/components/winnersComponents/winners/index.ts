import { WinnersController } from './controller';
import { WinnersModel } from '../../../models/winnersModel';
import { WinnersView } from './view';
import { AppModel } from '../../../models/appModel';

export class InitWinners {
  private view: WinnersView;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel
  ) {
    this.view = new WinnersView(this.model);
    new WinnersController(this.appModel, this.model, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
