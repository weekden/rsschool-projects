import { FormView } from '../components/form/view';
export class MainPage {
  public render(): HTMLElement {
    const container = document.createElement('div');
    const formContainer = new FormView().render();
    container.textContent = 'Main';
    container.append(formContainer);
    return container;
  }
}
