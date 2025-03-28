import { FormView } from '../components/form/view';
import { Count } from '../components/count';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const formContainer = new FormView().render();
    const viewCount = new Count().render();
    container.textContent = 'Main';
    container.append(formContainer, viewCount);
    return container;
  }
}
