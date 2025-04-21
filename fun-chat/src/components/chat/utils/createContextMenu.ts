import { createButton } from '../../../utils/dom/button';
import { createElement } from '../../../utils/dom/customElement';

export function createContextMenu(messageId: string): HTMLElement {
  const editButton = createButton({
    text: 'Edit',
    classes: ['context-btn', 'context-edit'],
    type: 'button',
  });

  const deleteButton = createButton({
    text: 'Delete',
    classes: ['context-btn', 'context-delete'],
    type: 'button',
  });

  const menu = createElement({
    tag: 'div',
    classes: ['context-menu'],
    children: [editButton, deleteButton],
    attributes: {
      'data-message-id': messageId,
    },
  });

  return menu;
}
