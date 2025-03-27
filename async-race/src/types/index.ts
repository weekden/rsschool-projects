type Main = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new () => Main>;
