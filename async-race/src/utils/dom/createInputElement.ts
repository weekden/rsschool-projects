import type { Input } from '../../types/elements/input';
export function createInputElement({ type, placeholder, classes }: Input): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  if (classes.length > 0) {
    input.classList.add(...classes);
  }
  if (placeholder) {
    input.placeholder = placeholder;
  }
  return input;
}
