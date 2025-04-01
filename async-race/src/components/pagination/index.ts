import { PaginationView } from './view';
import { PaginationController } from './controller';
import { GarageModel } from '../garage/model';
export class InitPagination {
  constructor(private readonly model: GarageModel) {}
  public init(): HTMLElement {
    const view = new PaginationView(this.model);
    new PaginationController(view, this.model);

    return view.render();
  }
}
