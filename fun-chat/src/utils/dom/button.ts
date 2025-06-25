import type { Button } from '../../types/elements/button';
export function createButton({
  id,
  text,
  classes,
  type,
  disabled = false,
  attributes = {},
}: Button): HTMLButtonElement {
  const button = document.createElement('button');
  if (id) {
    button.id = id;
  }
  button.textContent = text;
  if (classes.length > 0) {
    button.classList.add(...classes);
  }

  if (type) {
    button.type = type;
  }

  button.disabled = disabled;

  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, String(value));
  });

  return button;
}
