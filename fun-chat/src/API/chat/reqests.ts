import { socketService } from '../webSocketService';
import { GetAllAuthUsersRequest, GetAllUnauthorizedUsersRequest } from './types';

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
