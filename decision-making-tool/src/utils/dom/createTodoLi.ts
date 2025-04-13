import { createInputElement } from './createInput';
import type { Todo } from '../../types/todo-type';

export function createLi(
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

  const titleInput = createTitleInput(todo, changeTitleCallback);
  const weightInput = createWeightInput(todo, changeWeightCallback);

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

function createTitleInput(todo: Todo, onChange: (id: string, value: string) => void): HTMLInputElement {
  const input = createInputElement({
    type: 'text',
    value: todo.title,
    placeholder: 'Title',
    classes: ['todo-item__input', 'todo-item__input-title'],
  });
  input.addEventListener('input', () => onChange(todo.id, input.value));
  return input;
}

function createWeightInput(todo: Todo, onChange: (id: string, value: string) => void): HTMLInputElement {
  const input = createInputElement({
    type: 'number',
    value: `${todo.weight}`,
    placeholder: 'Weight',
    classes: ['todo-item__input', 'todo-item__input-weight'],
  });
  input.addEventListener('input', () => onChange(todo.id, input.value));
  return input;
}
