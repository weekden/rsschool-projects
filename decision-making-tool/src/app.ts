import { Header } from './components/Header';

export class App {
  private readonly container: HTMLElement;
  private readonly header: Header;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('app-container');
    document.body.append(this.container);

    this.header = new Header();

    this.render();
  }

  private render(): void {
    this.container.append(this.header.render());
  }
}
