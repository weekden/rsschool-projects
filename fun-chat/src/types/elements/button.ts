export type Button = {
  id?: string;
  text: string;
  type?: 'button' | 'submit';
  classes: string[];
  disabled?: boolean;
  attributes?: Record<string, string>;
};
