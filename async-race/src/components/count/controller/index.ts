import { GarageModel } from '../../garage/model';
import { CountView } from '../view';

export class CountController {
  constructor(
    private model: GarageModel,
    private view: CountView
  ) {
    this.model.subscribeCarsListener(() => this.updateCount());
    this.updateCount();
  }

  private updateCount(): void {
    this.view.updateCount();
  }
}
