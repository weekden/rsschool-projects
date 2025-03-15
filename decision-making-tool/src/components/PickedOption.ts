import { createElement } from '../utils/helpers/createElement';
export class ShowPickedOption {
  private readonly pickedOption: HTMLElement;

  constructor() {
    this.pickedOption = this.createOptionContainer();
  }

  public setTextToOptionContainer(text: string): void {
    this.pickedOption.textContent = text;
  }

  public render(): HTMLHeadElement {
    return this.pickedOption;
  }

  private createOptionContainer(): HTMLElement {
    const optionContainer = createElement({ tag: 'p', text: 'PRESS START BUTTON', classes: ['decision-option'] });
    return optionContainer;
  }
}
