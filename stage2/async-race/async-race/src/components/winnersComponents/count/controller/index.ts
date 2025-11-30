import { WinnersModel } from '../../../../models/winnersModel';
import { AppModel } from '../../../../models/appModel';
import { CountView } from '../view';

export class CountController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel,
    private readonly view: CountView
  ) {
    this.appModel.subscribePagesListener(() => this.updatePage());
    this.model.subscribeWinnersListener(() => this.updateCount());
    this.updatePage();
  }

  private updateCount(): void {
    this.view.updateCount();
  }

  private updatePage(): void {
    this.view.updatePage();
  }
}
