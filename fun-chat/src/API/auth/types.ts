import { User } from '../../types';

export type UserLoginRequest = {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: User;
  };
};

export type UserLogoutRequest = {
  id: string;
  type: 'USER_LOGOUT';
  payload: {
    user: User;
  };
};

type UserLoginResponse = {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
};

export type ErrorResponse = {
  id: string;
  type: 'ERROR';
  payload: {
    error:
      | 'a user with this login is already authorized'
      | 'another user is already authorized in this connection'
      | 'incorrect password';
  };
};

export type WSRequest = UserLoginRequest | UserLogoutRequest;

export type WSResponse = UserLoginResponse | ErrorResponse;
