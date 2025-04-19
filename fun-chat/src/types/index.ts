import { AppModel } from '../models/appModel';

type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new (appModel: AppModel) => Main>;

export type Subscriber = () => void;
export type PopupSubscriber = (message: string) => void;

export type User = {
  login: string;
  password: string;
};

export type UserStatus = {
  login: string;
  isLogined: boolean;
};

export type ChatMessage = {
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
