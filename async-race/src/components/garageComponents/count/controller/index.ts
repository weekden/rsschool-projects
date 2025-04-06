import { GarageModel } from '../../../../models/garageModel';
import { AppModel } from '../../../../models/appModel';
import { CountView } from '../view';

export class CountController {
  constructor(
    private appModel: AppModel,
    private model: GarageModel,
    private view: CountView
  ) {
    this.appModel.subscribePagesListener(() => this.updatePage());
    this.model.subscribeCarsListener(() => this.updateCount());
    this.updatePage();
  }

  private updateCount(): void {
    this.view.updateCount();
  }

  private updatePage(): void {
    this.view.updatePage();
  }
}
