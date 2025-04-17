import { AppModel } from '../models/appModel';

type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new (appModel: AppModel) => Main>;

export type Subscriber = () => void;

export type User = {
  login: string;
  password: string;
};

export type UserStatus = {
  login: string;
  isLogined: boolean;
};
