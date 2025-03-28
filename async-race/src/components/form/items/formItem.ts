import { createButton } from '../../../utils/dom/createButton';
import { createElement } from '../../../utils/dom/createElement';
import { createInputElement } from '../../../utils/dom/createInputElement';

export const createItemForForm = (buttonName: string): HTMLElement => {
  const item = createElement({
    tag: 'div',
    classes: ['controll', 'controll-wrapper'],
    children: [
      createInputElement({
        type: 'text',
        classes: ['controll-item', 'controll-item__input', 'constro-item__input-text'],
      }),
      createInputElement({
        type: 'color',
        classes: ['controll-item', 'controll-item__input', 'constro-item__input-color'],
      }),
      createButton({
        text: `${buttonName}`,
        classes: ['controll-item', 'controll-item__btn', `constro-item__btn-${buttonName}`],
      }),
    ],
  });
  return item;
};
