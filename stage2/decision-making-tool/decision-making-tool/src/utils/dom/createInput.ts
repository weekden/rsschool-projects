import type { Input } from '../../types/input-type';
export function createInputElement({
  type,
  placeholder,
  classes,
  value,
  list,
  id,
  disabled = false,
}: Input): HTMLInputElement {
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

  !disabled ? (input.disabled = false) : (input.disabled = true);

  return input;
}
