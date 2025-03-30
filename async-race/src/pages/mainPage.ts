import { InitForm } from '../components/form';
import { Count } from '../components/count';
import { InitGarage } from '../components/garage';
import { GarageModel } from '../components/garage/model';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const model = new GarageModel();

    const formContainer = new InitForm(model).init();
    const viewCount = new Count().render();

    container.textContent = 'Main';
    container.append(formContainer, viewCount);

    new InitGarage(model).init().then((garage) => {
      container.append(garage);
    });

    return container;
  }
}
