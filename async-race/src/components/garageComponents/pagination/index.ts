import { PaginationView } from './view';
import { PaginationController } from './controller';
import { GarageModel } from '../../../models/garageModel';
import { AppModel } from '../../../models/appModel';

export class InitPagination {
  private view: PaginationView;
  private controller: PaginationController;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: GarageModel
  ) {
    this.view = new PaginationView(this.model, this.appModel);
    this.controller = new PaginationController(this.appModel, this.model, this.view);
  }

  public render(): HTMLElement {
    return this.view.render();
  }

  // public init(): void {
  //   this.controller.init();
  // }
}
