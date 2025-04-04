import { GarageModel } from '../../../models/garageModel';
import { CountView } from '../view';

export class CountController {
  constructor(
    private model: GarageModel,
    private view: CountView
  ) {
    this.model.subscribeCarsListener(() => this.updateCount());
    this.model.subscribePagesListener(() => this.updatePage());
    this.updateCount();
  }

  private updateCount(): void {
    this.view.updateCount();
  }

  private updatePage(): void {
    this.view.updatePage();
  }
}
