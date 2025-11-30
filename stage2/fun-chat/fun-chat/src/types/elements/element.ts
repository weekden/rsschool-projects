export type ElementOptions = {
  tag: string;
  id?: string;
  text?: string;
  children?: HTMLElement[];
  classes?: string[];
  attributes?: Record<string, string>;
};
