import type { Todo } from '../types/todo-type';

export function createTodoItem(todo: Todo, deleteCallback: (id: string) => void): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.setAttribute('data-id', todo.id);

  const idSpan = document.createElement('span');
  idSpan.textContent = `${todo.id}`;

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = todo.title;
  titleInput.placeholder = 'Title';

  const weightInput = document.createElement('input');
  weightInput.type = 'number';
  weightInput.value = `${todo.weight}`;
  weightInput.placeholder = 'Weight';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteCallback(todo.id);
    li.remove();
  });

  li.append(idSpan, titleInput, weightInput, deleteButton);
  return li;
}
