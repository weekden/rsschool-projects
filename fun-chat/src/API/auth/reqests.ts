import type { User } from '../../types';
import { socketService } from '../webSocketService';
import { UserLoginRequest, UserLogoutRequest } from './types';

export function loginUser(user: User, id = crypto.randomUUID()): void {
  const request: UserLoginRequest = {
    id,
    type: 'USER_LOGIN',
    payload: {
      user: user,
    },
  };
  socketService.send(request);
}

export function logoutUser(user: User, id = crypto.randomUUID()): void {
  const request: UserLogoutRequest = {
    id,
    type: 'USER_LOGOUT',
    payload: {
      user: user,
    },
  };
  socketService.send(request);
}
