import { createItemForForm } from '../items/formItem';
import { createButton } from '../../../utils/dom/createButton';

import { createElement } from '../../../utils/dom/createElement';
export class FormView {
  private formContainer: HTMLElement;

  constructor() {
    this.formContainer = createElement({ tag: 'form', classes: ['form', 'controll-form'] });
  }

  public render(): HTMLElement {
    const createItem = createItemForForm('CREATE');
    const updateItem = createItemForForm('UPDATE');
    const stateItem = createElement({
      tag: 'div',
      classes: ['controll-item'],
      children: [
        createButton({
          text: 'RACE',
          classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
        }),
        createButton({
          text: 'RESET',
          classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
        }),
        createButton({
          text: 'GENERATE CAR',
          classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
        }),
      ],
    });

    this.formContainer.append(createItem, updateItem, stateItem);

    return this.formContainer;
  }
}
