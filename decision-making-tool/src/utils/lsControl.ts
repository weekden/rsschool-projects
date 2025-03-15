import type { TodoState } from '../types/todo-type';
import type { Todo } from '../types/todo-type';
import { getParsedItem } from './helpers/getParsedItem';

export class LSControl {
  private static STORAGE_KEY = 'todoState';

  public static getState(): TodoState {
    return getParsedItem<TodoState>(this.STORAGE_KEY, { items: [], counter: 0 });
  }

  public static saveState(state: TodoState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  public static addTodo(todo: Todo): void {
    const state = this.getState();
    state.items.push(todo);
    state.counter++;
    this.saveState(state);
  }

  public static deleteItem(id: string): void {
    const state = this.getState();
    state.items = state.items.filter((item) => item.id !== id);
    if (state.items.length === 0) {
      state.counter = 0;
    }
    this.saveState(state);
  }

  public static updateItems(id: string, updates: Partial<Todo>): void {
    const state = this.getState();
    const todo = state.items.find((item) => item.id === id);
    if (todo) {
      Object.assign(todo, updates);
      this.saveState(state);
    }
  }

  public static clearItems(): void {
    const state = this.getState();
    state.items = [];
    state.counter = 0;
    this.saveState(state);
  }
}
