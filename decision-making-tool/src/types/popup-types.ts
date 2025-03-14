type ButtonOptions = {
  text: string;
  onClick: (modal: HTMLDivElement, textArea?: HTMLTextAreaElement) => void;
};
export type ModalOptions = {
  content: string | HTMLElement;
  buttons: ButtonOptions[];
};
