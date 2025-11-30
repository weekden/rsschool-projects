import { ChatMessage } from '../../types';
import { createElement } from '../dom/customElement';

export function createMessageItem(message: ChatMessage, currentUser: string = ''): HTMLElement {
  const isOutgoing = message.from === currentUser;

  const messageWrapper = createElement({
    tag: 'div',
    classes: ['chat-message', isOutgoing ? 'chat-message__outgoing' : 'chat-message__incoming'],
    children: [
      createHeaderMessage(message, currentUser),
      createMainMessage(message),
      createFooterMessage(message, isOutgoing),
    ],
    attributes: isOutgoing ? { 'message-id': message.id } : {},
  });
  return messageWrapper;
}

function createHeaderMessage(message: ChatMessage, currentUser: string = ''): HTMLElement {
  const isOutgoing = message.from === currentUser;
  return createElement({
    tag: 'div',
    classes: ['chat-message__header'],
    children: [
      createElement({
        tag: 'span',
        classes: ['chat-message__header-sender'],
        text: isOutgoing ? 'You' : message.from,
      }),
      createElement({
        tag: 'span',
        classes: ['chat-message__header-time'],
        text: `${new Date(message.datetime).getHours()}:${new Date(message.datetime).getMinutes()}`,
      }),
    ],
  });
}

function createMainMessage(message: ChatMessage): HTMLElement {
  return createElement({
    tag: 'div',
    classes: ['chat-message__text'],
    text: message.text,
  });
}

function createFooterMessage(message: ChatMessage, isOutgoing: boolean): HTMLElement {
  const messageFooter = createElement({
    tag: 'div',
    classes: ['chat-message__footer'],
  });
  const { isDelivered, isReaded, isEdited } = message.status;
  const isEditText = isEdited ? 'edit' : '';
  if (isOutgoing) {
    const statusText = isReaded ? '✓✓' : isDelivered ? '✓' : '';
    const statusElement = createElement({
      tag: 'span',
      classes: ['chat-message__footer-status'],
      text: statusText,
    });

    messageFooter.append(statusElement);
  }
  const editedElement = createElement({
    tag: 'span',
    classes: ['chat-message__footer-edited'],
    text: isEditText,
  });
  messageFooter.prepend(editedElement);

  return messageFooter;
}
