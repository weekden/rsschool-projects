export type Todo = {
  id: string;
  title: string;
  weight: string | number;
};

export type TodoState = {
  items: Todo[];
  counter: number;
};
