import { createTodoItem } from '../utils/createTodoLi';
import { LSControl } from '../utils/lsControl';
import type { Todo } from '../types/todo-type';

export class TodoList {
  private readonly ulElement: HTMLUListElement;

  constructor(
    private items: Todo[] = LSControl.getState().items,
    private idCounter: number = LSControl.getState().counter
  ) {
    this.ulElement = document.createElement('ul');
    this.ulElement.classList.add('list');

    this.renderFromStorage();
  }

  public addTodo(item?: Todo): void {
    this.idCounter = LSControl.getState().counter;
    const newItem: Todo = item ?? { id: `#${++this.idCounter}`, title: '', weight: '' };
    this.items.push(newItem);
    LSControl.addTodo(newItem);

    const li = createTodoItem(
      newItem,
      () => this.deleteTodo(newItem.id),
      (id, value) => this.updateTodo(id, { title: value }),
      (id, value) => this.updateTodo(id, { weight: value })
    );

    this.ulElement.appendChild(li);
  }

  public updateTodo(id: string, updates: Partial<Todo>): void {
    LSControl.updateTodo(id, updates);
  }

  public clearTodoList(): void {
    this.items.length = 0;
    this.idCounter = 0;
    this.ulElement.replaceChildren();
  }

  public render(): HTMLUListElement {
    return this.ulElement;
  }

  private deleteTodo(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);

    if (this.items.length === 0) {
      this.idCounter = 0;
    }

    LSControl.deleteTodo(id);
  }

  private renderFromStorage(): void {
    if (!LSControl.getState()) return;

    this.items.forEach((item) =>
      this.ulElement.appendChild(
        createTodoItem(
          item,
          () => this.deleteTodo(item.id),
          (id, value) => this.updateTodo(id, { title: value }),
          (id, value) => this.updateTodo(id, { weight: value })
        )
      )
    );
  }
}
