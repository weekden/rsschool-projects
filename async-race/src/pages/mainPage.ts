import { InitForm } from '../components/form';
import { InitCount } from '../components/count';
import { InitGarage } from '../components/garage';
import { GarageModel } from '../components/garage/model';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const model = new GarageModel();

    new InitGarage(model).init().then((garage) => {
      const formContainer = new InitForm(model).init();
      const count = new InitCount(model).init();
      container.append(formContainer, count, garage);
    });

    container.textContent = 'Main';
    container.append();

    return container;
  }
}
