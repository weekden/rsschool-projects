import { Header } from '../components/Header';
import { TodoList } from '../components/List';
import { Buttons } from '../components/Buttons';

export class MainPage {
  private readonly header: Header;
  private readonly list: TodoList;
  private readonly buttonsContainer: Buttons;

  constructor() {
    this.header = new Header();
    this.list = new TodoList();
    this.buttonsContainer = new Buttons(this.list);
  }

  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('app-container');
    container.append(this.header.render(), this.list.render(), this.buttonsContainer.render());
    return container;
  }
}
