import { createTodoItem } from '../utils/createTodoLi';
import { getParsedItem } from '../utils/getParsedItem';
import type { Todo } from '../types/todo-type';

export class TodoList {
  private readonly ulElement: HTMLUListElement;

  constructor(
    private items: Todo[] = getParsedItem<Todo[]>('items', []),
    private idCounter = getParsedItem<number>('idCounter', 0)
  ) {
    this.ulElement = document.createElement('ul');
    this.ulElement.classList.add('list');

    if (this.items.length === 0) {
      this.addTodo();
    } else {
      this.items.forEach((item) => this.ulElement.appendChild(createTodoItem(item, () => this.deleteTodo(item.id))));
    }
  }

  public addTodo(item?: Todo): void {
    const newItem: Todo = item ?? { id: `#${++this.idCounter}`, title: '', weight: '' };
    this.items.push(newItem);

    const li = createTodoItem(newItem, () => this.deleteTodo(newItem.id));
    this.saveTodos();
    this.ulElement.appendChild(li);
  }

  public render(): HTMLUListElement {
    return this.ulElement;
  }

  public deleteTodo(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('idCounter', this.idCounter.toString());
  }
}
