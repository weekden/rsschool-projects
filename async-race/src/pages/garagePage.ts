import { InitForm } from '../components/form';
import { InitCount } from '../components/count';
import { InitGarage } from '../components/garage';
import { InitPagination } from '../components/pagination';
import { GarageModel } from '../models/garageModel';
import { AppModel } from '../models/appModel';

export class MainPage {
  constructor(private appModel: AppModel) {}

  public render(): HTMLElement {
    const container = document.createElement('div');
    const model = new GarageModel();
    const pagination = new InitPagination(this.appModel, model);

    const formContainer = new InitForm(model).init();
    const count = new InitCount(this.appModel, model).init();

    const garage = new InitGarage(this.appModel, model);

    container.append(formContainer, count, garage.render(), pagination.render());

    pagination.init();
    garage.render();

    return container;
  }
}
