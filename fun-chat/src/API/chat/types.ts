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

export type SendingMessageRequest = {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
};

type SendingMessageResponse = {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
};

export type GetHistoryMessagesRequest = {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    user: {
      login: string;
    };
  };
};

type GetHistoryMessagesResponse = {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    messages: [];
  };
};

export type WSChatRequest =
  | GetAllAuthUsersRequest
  | GetAllUnauthorizedUsersRequest
  | SendingMessageRequest
  | GetHistoryMessagesRequest;

export type WSChatResponse =
  | GetAllAuthUsersResponse
  | GetAllUnauthorizedUsersResponse
  | SendingMessageResponse
  | GetHistoryMessagesResponse;
