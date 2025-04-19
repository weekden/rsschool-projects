import { ChatMessage } from '../../types';
import { createElement } from '../dom/customElement';

export function createMessageItem(message: ChatMessage, currentUser: string = ''): HTMLElement {
  const isOutgoing = message.from === currentUser;

  const messageWrapper = createElement({
    tag: 'div',
    classes: ['chat-message', isOutgoing ? 'chat-message__outgoing' : 'chat-message__incoming'],
    children: [createHeaderMessage(message), createMainMessage(message), createFooterMessage(isOutgoing)],
    attributes: isOutgoing ? { 'message-id': message.id } : {},
  });
  return messageWrapper;
}

function createHeaderMessage(message: ChatMessage): HTMLElement {
  return createElement({
    tag: 'div',
    classes: ['chat-message__header'],
    children: [
      createElement({
        tag: 'span',
        classes: ['chat-message__header-sender'],
        text: message.from,
      }),
      createElement({
        tag: 'span',
        classes: ['chat-message__header-time'],
        text: message.datetime.toString(),
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

function createFooterMessage(isOutgoing: boolean): HTMLElement {
  const messageFooter = createElement({
    tag: 'div',
    classes: ['chat-message__footer'],
  });

  if (!isOutgoing) return messageFooter;

  const statusElement = createElement({
    tag: 'span',
    classes: ['chat-message__footer-status'],
  });

  const editedElement = createElement({
    tag: 'span',
    classes: ['chat-message__footer-edited'],
  });

  messageFooter.append(editedElement, statusElement);

  return messageFooter;
}

// function createFooterMessage(message: ChatMessage, isOutgoing: boolean): HTMLElement {
//   const messageFooter = createElement({
//     tag: 'div',
//     classes: ['chat-message__footer'],
//   });

//   if (!isOutgoing) return messageFooter;

//   const { isEdited, isDelivered, isReaded } = message.status;
//   const statusText = isReaded ? '✓✓' : isDelivered ? '✓' : '';

//   const statusElement = createElement({
//     tag: 'span',
//     classes: ['chat-message__footer-status'],
//     text: statusText,
//   });

//   messageFooter.append(statusElement);

//   if (isEdited) {
//     const editedElement = createElement({
//       tag: 'span',
//       classes: ['chat-message__footer-edited'],
//       text: 'edited',
//     });
//     messageFooter.prepend(editedElement);
//   }

//   return messageFooter;
// }
