import { InitForm } from '../components/form';
import { Count } from '../components/count';
import { InitGarage } from '../components/garage';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const formContainer = new InitForm().init();
    const viewCount = new Count().render();

    container.textContent = 'Main';
    container.append(formContainer, viewCount);

    new InitGarage().init().then((garage) => {
      container.append(garage);
    });

    return container;
  }
}
