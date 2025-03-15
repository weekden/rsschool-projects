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
          children: [this.createButtonBack(), this.createVolumeChecked(), this.createTimer()],
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
    buttonStart.addEventListener('click', () => {});
    return buttonStart;
  }

  private createVolumeChecked(): HTMLElement {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const soundSwitch = createElement({
      tag: 'label',
      children: [checkbox],
      classes: ['decision-control__item-label', 'decision-control__item-label-checkbox'],
    });
    return soundSwitch;
  }

  private createTimer(): HTMLElement {
    const timer = document.createElement('input');
    timer.id = 'timer';
    timer.classList.add('decision-control__item-timer-input');
    timer.type = 'number';
    timer.min = '5';
    timer.placeholder = 'sec';
    const timerContainer = createElement({
      tag: 'div',
      classes: ['decision-control__item', 'decision-control__item-timer-wrapper'],
      children: [
        createElement({
          tag: 'label',
          classes: ['decision-control__item-label', 'decision-control__item-label-timer'],
        }),
        timer,
      ],
    });
    return timerContainer;
  }
}
