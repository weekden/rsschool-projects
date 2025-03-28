import type { Button } from '../../types/elements/button';
export function createButton({ id, text, classes }: Button): HTMLButtonElement {
  const button = document.createElement('button');
  if (id) {
    button.id = id;
  }
  button.textContent = text;
  if (classes.length > 0) {
    button.classList.add(...classes);
  }
  return button;
}
