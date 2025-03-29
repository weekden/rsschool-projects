type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new () => Main>;

type BaseCar = {
  name: string;
  color: string;
};

export type Car = BaseCar & {
  id: number;
};

export type CreateCarParameters = BaseCar;
