export class TodoList {
  private ulListElement: HTMLUListElement;

  constructor() {
    this.ulListElement = document.createElement('ul');
    this.ulListElement.classList.add('todo-list');
  }

  public render(): HTMLUListElement {
    return this.ulListElement;
  }
}
