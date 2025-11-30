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

type MessageDeliveryStatusResponse = {
  id: null;
  type: 'MSG_DELIVER';
  payload: {
    message: {
      id: string;
      status: {
        isDelivered: boolean;
      };
    };
  };
};

export type MessageDeletaRequest = {
  id: string;
  type: 'MSG_DELETE';
  payload: {
    message: {
      id: string;
    };
  };
};

type MessageDeletaResponse = {
  id: string;
  type: 'MSG_DELETE';
  payload: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
};

export type MessageToEditRequest = {
  id: string;
  type: 'MSG_EDIT';
  payload: {
    message: {
      id: string;
      text: string;
    };
  };
};

type MessageToEditResponse = {
  id: string;
  type: 'MSG_EDIT';
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
};

export type ReadMessageRequest = {
  id: string;
  type: 'MSG_READ';
  payload: {
    message: {
      id: string;
    };
  };
};

type ReadMessageResponse = {
  id: string;
  type: 'MSG_READ';
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
};

export type WSChatRequest =
  | GetAllAuthUsersRequest
  | GetAllUnauthorizedUsersRequest
  | SendingMessageRequest
  | GetHistoryMessagesRequest
  | MessageDeletaRequest
  | MessageToEditRequest
  | ReadMessageRequest;

export type WSChatResponse =
  | GetAllAuthUsersResponse
  | GetAllUnauthorizedUsersResponse
  | SendingMessageResponse
  | GetHistoryMessagesResponse
  | MessageDeliveryStatusResponse
  | MessageDeletaResponse
  | MessageToEditResponse
  | ReadMessageResponse;
