import { socketService } from '../webSocketService';
import {
  GetAllAuthUsersRequest,
  GetAllUnauthorizedUsersRequest,
  GetHistoryMessagesRequest,
  MessageDeletaRequest,
  MessageToEditRequest,
  ReadMessageRequest,
  SendingMessageRequest,
} from './types';

export function getAllAuthUsers(id = crypto.randomUUID()): void {
  const request: GetAllAuthUsersRequest = {
    id,
    type: 'USER_ACTIVE',
    payload: null,
  };
  socketService.send(request);
}

export function getAllUnauthorizedUsers(id = crypto.randomUUID()): void {
  const request: GetAllUnauthorizedUsersRequest = {
    id,
    type: 'USER_INACTIVE',
    payload: null,
  };
  socketService.send(request);
}

export function sendingMessage(login: string, text: string, id = crypto.randomUUID()): void {
  const request: SendingMessageRequest = {
    id,
    type: 'MSG_SEND',
    payload: {
      message: {
        to: login,
        text: text,
      },
    },
  };
  socketService.send(request);
}

export function getHistoryMessages(login: string, id = crypto.randomUUID()): void {
  const request: GetHistoryMessagesRequest = {
    id,
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login: login,
      },
    },
  };
  socketService.send(request);
}

export function deleteMessage(messageId: string, id = crypto.randomUUID()): void {
  const request: MessageDeletaRequest = {
    id,
    type: 'MSG_DELETE',
    payload: {
      message: {
        id: messageId,
      },
    },
  };
  socketService.send(request);
}

export function editMessage(messageId: string, text: string, id = crypto.randomUUID()): void {
  const request: MessageToEditRequest = {
    id,
    type: 'MSG_EDIT',
    payload: {
      message: {
        id: messageId,
        text: text,
      },
    },
  };
  socketService.send(request);
}

export function readMessageChangeStatus(messageId: string, id = crypto.randomUUID()): void {
  const request: ReadMessageRequest = {
    id,
    type: 'MSG_READ',
    payload: {
      message: {
        id: messageId,
      },
    },
  };
  socketService.send(request);
}
