import { createElement } from '../utils/helpers/createElement';

export class DecisionControl {
  private readonly controlContainer: HTMLElement;

  constructor() {
    this.controlContainer = createElement({
      tag: 'form',
      classes: ['decision-control__wrapper'],
      children: [
        createElement({
          tag: 'div',
          classes: ['decision-control__wrapper-top'],
          children: [this.createButtonBack(), this.createSoundChecked(), this.createTimer()],
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

  private createSoundChecked(): HTMLElement {
    const soundCheckbox = document.createElement('input');
    soundCheckbox.id = 'sound-chekbox';
    soundCheckbox.type = 'checkbox';
    soundCheckbox.checked = true;

    const soundCheckboxLabel = document.createElement('label');
    soundCheckboxLabel.htmlFor = 'sound-chekbox';
    soundCheckboxLabel.classList.add('decision-control__item-label', 'decision-control__item-label-checkbox');

    let soundCheckboxLabelContent = this.createIcon('soundOn');

    soundCheckbox.addEventListener('change', () => {
      soundCheckboxLabel.removeChild(soundCheckboxLabelContent);

      if (soundCheckbox.checked) {
        soundCheckboxLabelContent = this.createIcon('soundOn');
      } else {
        soundCheckboxLabelContent = this.createIcon('soundOff');
      }

      soundCheckboxLabel.appendChild(soundCheckboxLabelContent);
    });

    soundCheckboxLabel.append(soundCheckbox, soundCheckboxLabelContent);
    return soundCheckboxLabel;
  }

  private createTimer(): HTMLElement {
    const timerInput = document.createElement('input');
    timerInput.id = 'timer-input';
    timerInput.classList.add('decision-control__item-timer-input');
    timerInput.type = 'number';
    timerInput.min = '5';
    timerInput.max = '30';
    timerInput.value = '7';
    timerInput.placeholder = 'sec';
    timerInput.required = true;

    const timerLabel = document.createElement('label');
    timerLabel.htmlFor = 'timer-input';
    timerLabel.classList.add('decision-control__item-label', 'decision-control__item-label-timer');
    timerLabel.append(this.createIcon('time'));

    const timerContainer = createElement({
      tag: 'div',
      classes: ['decision-control__item', 'decision-control__item-timer-wrapper'],
      children: [timerLabel, timerInput],
    });
    return timerContainer;
  }

  private createIcon(iconType: string): HTMLImageElement {
    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.src = `./assets/icons/${iconType}.png`;
    icon.alt = 'icon';
    return icon;
  }
}
