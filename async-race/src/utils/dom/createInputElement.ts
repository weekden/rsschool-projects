import type { Input } from '../../types/elements/input';
export function createInputElement({ type, placeholder, classes, value, list, id }: Input): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;

  if (value) {
    input.value = value;
  }

  if (id) {
    input.id = id;
  }

  if (list) {
    input.setAttribute('list', list);
  }

  if (classes.length > 0) {
    input.classList.add(...classes);
  }

  if (placeholder) {
    input.placeholder = placeholder;
  }

  return input;
}
