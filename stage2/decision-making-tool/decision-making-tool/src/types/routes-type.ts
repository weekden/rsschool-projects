type Page = {
  render: () => HTMLElement;
};

export type Routes = Record<string, new () => Page>;
