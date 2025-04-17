export type GetAllAuthUsersRequest = {
  id: string;
  type: 'USER_ACTIVE';
  payload: null;
};

type GetAllAuthUsersResponse = {
  id: string;
  type: 'USER_ACTIVE';
  payload: {
    users: [];
  };
};

export type GetAllUnauthorizedUsersRequest = {
  id: string;
  type: 'USER_INACTIVE';
  payload: null;
};

type GetAllUnauthorizedUsersResponse = {
  id: string;
  type: 'USER_INACTIVE';
  payload: {
    users: [];
  };
};

export type WSChatRequest = GetAllAuthUsersRequest | GetAllUnauthorizedUsersRequest;
export type WSChatResponse = GetAllAuthUsersResponse | GetAllUnauthorizedUsersResponse;
