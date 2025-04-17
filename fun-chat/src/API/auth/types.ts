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

// type UserExternalLoginResponse = {
//   id: null;
//   type: 'USER_EXTERNAL_LOGIN';
//   payload: {
//     user: {
//       login: string;
//       isLogined: boolean;
//     };
//   };
// };

// type UserExternalLogoutResponse = {
//   id: null;
//   type: 'USER_EXTERNAL_LOGOUT';
//   payload: {
//     user: {
//       login: string;
//       isLogined: boolean;
//     };
//   };
// };

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

type UserLogoutResponse = {
  id: string;
  type: 'USER_LOGOUT';
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

export type WSAuthRequest = UserLoginRequest | UserLogoutRequest;

export type WSAuthResponse =
  | UserLoginResponse
  | UserLogoutResponse
  // | UserExternalLoginResponse
  // | UserExternalLogoutResponse
  | ErrorResponse;
