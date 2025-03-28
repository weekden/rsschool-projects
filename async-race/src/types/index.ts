type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new () => Main>;

export type Car = {
  model: string;
  color: string;
};
