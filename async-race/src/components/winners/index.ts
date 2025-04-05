import { WinnersController } from './controller';
import { WinnersModel } from './model';
import { WinnersView } from './view';

export class InitWinners {
  private view: WinnersView;

  constructor(private readonly modelWinners: WinnersModel) {
    this.view = new WinnersView(this.modelWinners);
    new WinnersController(this.modelWinners, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
