import { CountView } from './view';
import { CountController } from './controller';
import { GarageModel } from '../garage/model';

export class InitCount {
  constructor(private model: GarageModel) {}

  public init(): HTMLElement {
    const view = new CountView(this.model);
    new CountController(this.model, view);
    return view.render();
  }
}
