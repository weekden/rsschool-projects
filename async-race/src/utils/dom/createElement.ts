import type { ElementOptions } from '../../types/elements/element';
export const createElement = (options: ElementOptions): HTMLElement => {
  const { tag = 'div', id, text = '', children = [], classes = [], attributes = {} } = options;
  const element = document.createElement(tag);
  element.textContent = text;

  if (id) {
    element.id = id;
  }

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  element.append(...children);
  return element;
};
