type ButtonOptions = {
  text: string;
  onClick: (modal: HTMLDivElement, textArea?: HTMLTextAreaElement) => void;
};
export type PopupOptions = {
  content: string | HTMLElement;
  buttons: ButtonOptions[];
};
