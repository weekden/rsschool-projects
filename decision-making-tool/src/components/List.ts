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
      this.render();
    } else {
      this.items.forEach((item) =>
        this.ulElement.appendChild(
          createTodoItem(
            item,
            () => this.deleteTodo(item.id),
            (id, value) => this.changeTodoItem(id, value),
            (id, value) => this.changeTodoWeight(id, value)
          )
        )
      );
    }
  }

  public addTodo(item?: Todo): void {
    const newItem: Todo = item ?? { id: `#${++this.idCounter}`, title: '', weight: '' };
    this.items.push(newItem);

    const li = createTodoItem(
      newItem,
      () => this.deleteTodo(newItem.id),
      (id, value) => this.changeTodoItem(id, value),
      (id, value) => this.changeTodoWeight(id, value)
    );
    this.saveTodos();
    this.ulElement.appendChild(li);
  }

  public render(): HTMLUListElement {
    this.idCounter = 0;
    return this.ulElement;
  }

  public deleteTodo(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveTodos();
  }

  public changeTodoItem(id: string, value: string): void {
    const todo = this.findTodoById(id);
    if (todo) {
      todo.title = value;
      this.saveTodos();
    }
  }

  public changeTodoWeight(id: string, value: string): void {
    const todo = this.findTodoById(id);
    if (todo) {
      todo.weight = value;
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('idCounter', this.idCounter.toString());
  }

  private findTodoById(id: string): Todo | undefined {
    return this.items.find((item) => item.id === id);
  }
}
