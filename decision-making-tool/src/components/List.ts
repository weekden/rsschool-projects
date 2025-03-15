import { createLi } from '../utils/createTodoLi';
import { LSControl } from '../utils/lsControl';
import type { Todo } from '../types/todo-type';

export class TodoList {
  private readonly ulElement: HTMLUListElement;

  constructor(
    public items: Todo[] = LSControl.getState().items,
    public idCounter: number = LSControl.getState().counter
  ) {
    this.ulElement = document.createElement('ul');
    this.ulElement.classList.add('list');

    this.renderFromStorage();
  }

  public addLi(item?: Todo): void {
    this.idCounter = LSControl.getState().counter;
    const newItem: Todo = item ?? { id: `#${++this.idCounter}`, title: '', weight: '' };
    this.items.push(newItem);

    LSControl.addTodo(newItem);

    const li = this.createLiElement(newItem);
    this.ulElement.appendChild(li);
  }

  public clearUl(): void {
    this.items.length = 0;
    this.idCounter = 0;
    this.ulElement.replaceChildren();
  }

  public render(): HTMLUListElement {
    return this.ulElement;
  }

  public renderFromStorage(): void {
    if (!localStorage.getItem('todoState')) {
      this.addLi();
    } else {
      this.items.forEach((item) => this.ulElement.appendChild(this.createLiElement(item)));
    }
  }

  private updateUl(id: string, updates: Partial<Todo>): void {
    LSControl.updateItems(id, updates);
  }

  private deleteLi(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);

    if (this.items.length === 0) {
      this.idCounter = 0;
    }

    LSControl.deleteItem(id);
  }

  private createLiElement(item: Todo): HTMLLIElement {
    return createLi(
      item,
      () => this.deleteLi(item.id),
      (id, value) => this.updateUl(id, { title: value }),
      (id, value) => this.updateUl(id, { weight: value })
    );
  }
}
