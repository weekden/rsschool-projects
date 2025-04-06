import { AppModel } from '../models/appModel';

type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new (appModel: AppModel) => Main>;

type BaseCar = {
  name: string;
  color: string;
};

export type Car = BaseCar & {
  id: number;
};

export type CreateCarParameters = BaseCar;

export type GaragePageResponse = {
  cars: Car[];
  totalCount: number;
};

export type CarListItem = {
  brand: string;
  model: string;
};

export type EngineState = 'started' | 'stopped' | 'drive';

export type EngineResponse = {
  velocity: number;
  distance: number;
};

export type DriveResponse = {
  success: boolean;
};

export type WinnerItem = {
  id: number;
  time: number;
  wins?: number;
  color?: string;
  name?: string;
};

export type WinnersTypeSort = 'id' | 'wins' | 'time';
export type WinnersTypeOrder = 'ASC' | 'DESC';

export type WinnersTableResponse = {
  page: number;
  limit: number;
  sort?: WinnersTypeSort;
  order?: WinnersTypeOrder;
};

export type WinnersPageData = {
  winners: WinnerItem[];
  totalCount: number;
};
