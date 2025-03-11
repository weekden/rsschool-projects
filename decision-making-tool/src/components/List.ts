import { createTodoItem } from '../utils/createTodoLi';
import type { Todo } from '../types/todo-type';

export class TodoList {
  private readonly ulListElement: HTMLUListElement;

  constructor(
    private readonly items: Todo[] = [],
    private idCounter = 1
  ) {
    this.ulListElement = document.createElement('ul');
    this.ulListElement.classList.add('todo-list');

    this.addTodo();
    this.render();
  }

  public addTodo(): void {
    const newItem: Todo = { id: this.idCounter++, title: '', weight: '' };
    this.items.push(newItem);

    const li = createTodoItem(newItem);
    this.ulListElement.appendChild(li);
  }

  public render(): HTMLUListElement {
    return this.ulListElement;
  }
}
