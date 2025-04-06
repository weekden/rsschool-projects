import { PaginationView } from './view';
import { PaginationController } from './controller';
import { AppModel } from '../../../models/appModel';
import { WinnersModel } from '../../../models/winnersModel';

export class InitPagination {
  private view: PaginationView;
  private controller: PaginationController;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel
  ) {
    this.view = new PaginationView(this.appModel, this.model);
    this.controller = new PaginationController(this.appModel, this.model, this.view);
  }

  public init(): HTMLElement {
    return this.view.render();
  }
}
