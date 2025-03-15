import { createElement } from '../utils/helpers/createElement';

export class DecisionControl {
  private readonly controlContainer: HTMLElement;

  constructor() {
    this.controlContainer = createElement({
      tag: 'div',
      classes: ['decision-control__wrapper'],
      children: [
        createElement({
          tag: 'div',
          classes: ['decision-control__wrapper-top'],
          children: [this.createButtonBack(), this.createVolumeChecked()],
        }),

        createElement({
          tag: 'div',
          classes: ['decision-control__wrapper-bottom'],
          children: [this.createButtonStart()],
        }),
      ],
    });
  }

  public render(): HTMLElement {
    return this.controlContainer;
  }

  private createButtonBack(): HTMLElement {
    const buttonBack = createElement({
      tag: 'button',
      text: 'back',
      classes: ['button', 'decision-control__item', 'decision-control__wrapper-top-button'],
    });
    buttonBack.addEventListener('click', () => {
      window.history.back();
    });
    return buttonBack;
  }

  private createButtonStart(): HTMLElement {
    const buttonStart = createElement({
      tag: 'button',
      text: 'start',
      classes: ['button', 'decision-control__item', 'decision-control__wrapper-bottom-button'],
    });
    buttonStart.addEventListener('click', () => {
      window.history.back();
    });
    return buttonStart;
  }

  private createVolumeChecked(): HTMLElement {
    const soundSwitch = createElement({
      tag: 'label',
      children: [
        createElement({
          tag: 'input',
          classes: ['decision-control__item'],
        }),
      ],
    });
    return soundSwitch;
  }
}
