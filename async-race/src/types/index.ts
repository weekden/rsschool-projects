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
  id: string;
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
  id: string;
  time: number;
};
