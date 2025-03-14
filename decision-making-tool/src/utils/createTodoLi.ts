import type { Todo } from '../types/todo-type';

export function createTodoItem(
  todo: Todo,
  deleteCallback: (id: string) => void,
  changeTitleCallback: (id: string, value: string) => void,
  changeWeightCallback: (id: string, value: string) => void
): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.setAttribute('data-id', todo.id);

  const idSpan = document.createElement('div');
  idSpan.classList.add('todo-item__id');
  idSpan.textContent = `${todo.id}`;

  const titleInput = document.createElement('input');
  titleInput.classList.add('todo-item__input', 'todo-item__input-title');
  titleInput.type = 'text';
  titleInput.value = todo.title;
  titleInput.placeholder = 'Title';
  titleInput.addEventListener('input', () => {
    changeTitleCallback(todo.id, titleInput.value);
  });

  const weightInput = document.createElement('input');
  weightInput.classList.add('todo-item__input', 'todo-item__input-weight');
  weightInput.type = 'number';
  weightInput.value = `${todo.weight}`;
  weightInput.placeholder = 'Weight';
  weightInput.addEventListener('input', () => {
    changeWeightCallback(todo.id, weightInput.value);
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('todo-item__button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteCallback(todo.id);
    li.remove();
  });

  li.append(idSpan, titleInput, weightInput, deleteButton);
  return li;
}
