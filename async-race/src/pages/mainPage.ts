import { FormView } from '../components/form/view';
import { Count } from '../components/count';
import { GarageView } from '../components/garage/view';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const formContainer = new FormView().render();
    const viewCount = new Count().render();
    const garage = new GarageView().render();
    container.textContent = 'Main';
    container.append(formContainer, viewCount, garage);
    return container;
  }
}
