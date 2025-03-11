import { Header } from './components/Header';
import { TodoList } from './components/List';
import { Buttons } from './components/Buttons';

export class App {
  private readonly container: HTMLElement;
  private readonly header: Header;
  private readonly list: TodoList;
  private readonly buttonsContainer: Buttons;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('app-container');
    document.body.append(this.container);

    this.header = new Header();
    this.list = new TodoList();
    this.buttonsContainer = new Buttons(this.list);

    this.render();
  }

  private render(): void {
    this.container.append(this.header.render(), this.list.render(), this.buttonsContainer.render());
  }
}
