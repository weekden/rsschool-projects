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

    new InitGarage(model).init().then((garage) => {
      const formContainer = new InitForm(model).init();
      const count = new InitCount(model).init();
      const pagination = new InitPagination(model).init();
      container.append(formContainer, count, garage, pagination);
    });

    container.textContent = 'Main';
    container.append();

    return container;
  }
}
