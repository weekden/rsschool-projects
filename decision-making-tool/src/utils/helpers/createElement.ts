import type { ElementOptions } from '../../types/element-type';
export const createElement = (options: ElementOptions): HTMLElement => {
  const { tag = 'div', id = '', text = '', children = [], classes = [] } = options;
  const element = document.createElement(tag);
  element.textContent = text;
  element.id = id;
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  element.append(...children);
  return element;
};
