export type Todo = {
  id: string;
  title: string;
  weight: string;
};

export type TodoState = {
  items: Todo[];
  counter: number;
};
