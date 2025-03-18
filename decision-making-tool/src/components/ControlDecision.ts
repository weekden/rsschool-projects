import { createElement } from '../utils/helpers/createElement';
import { LSControl } from '../utils/lsControl';
import type { ControlCallback } from '../types/control-type';

export class DecisionControl {
  private readonly controlContainer: HTMLElement;
  private readonly defaultDuration: number = 5;
  private duration: number;
  private isSoundOn: boolean;
  private disabledBlock: HTMLElement | null = null;
  private onStart: (controlObject: ControlCallback) => void;

  constructor(onStart: (controlObject: ControlCallback) => void) {
    this.onStart = onStart;
    this.duration = this.defaultDuration;
    this.isSoundOn = LSControl.getSoundState();
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

  public setDuration(): number {
    return this.duration || this.defaultDuration;
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
      location.hash = '/';
    });
    return buttonBack;
  }

  private createButtonStart(): HTMLElement {
    const buttonStart = createElement({
      tag: 'button',
      text: 'start',
      classes: ['button', 'decision-control__item', 'decision-control__wrapper-bottom-button'],
    });
    buttonStart.addEventListener('click', (event) => {
      event.preventDefault();
      const controlObject = {
        duration: this.duration,
        isSoundOn: this.isSoundOn,
      };
      this.addDisabledBlock();

      this.onStart(controlObject);

      setTimeout(() => {
        this.removeDisabledBlock();
      }, this.duration * 1000);
    });
    return buttonStart;
  }

  private createSoundChecked(): HTMLElement {
    const soundCheckbox = document.createElement('input');
    soundCheckbox.id = 'sound-chekbox';
    soundCheckbox.type = 'checkbox';
    soundCheckbox.checked = this.isSoundOn;

    const soundCheckboxLabel = document.createElement('label');
    soundCheckboxLabel.htmlFor = 'sound-chekbox';
    soundCheckboxLabel.classList.add('decision-control__item-label', 'decision-control__item-label-checkbox');

    let soundCheckboxLabelContent = this.createIcon(this.isSoundOn ? 'soundOn' : 'soundOff');

    soundCheckbox.addEventListener('change', () => {
      this.isSoundOn = soundCheckbox.checked;

      soundCheckboxLabel.removeChild(soundCheckboxLabelContent);

      if (this.isSoundOn) {
        soundCheckboxLabelContent = this.createIcon('soundOn');
        this.isSoundOn = true;
      } else {
        this.isSoundOn = false;
        soundCheckboxLabelContent = this.createIcon('soundOff');
      }

      LSControl.saveSoundState(this.isSoundOn);
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
    timerInput.value = `${this.defaultDuration}`;
    timerInput.placeholder = 'sec';
    timerInput.required = true;
    timerInput.addEventListener('input', () => {
      this.duration = +timerInput.value;
    });

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

  private createDisabledBlock(): HTMLElement {
    const disabledBlock = createElement({ tag: 'div', classes: ['decision-control__disabled'] });
    return disabledBlock;
  }

  private addDisabledBlock(): void {
    if (!this.disabledBlock) {
      this.disabledBlock = this.createDisabledBlock();
      this.controlContainer.appendChild(this.disabledBlock);
    }
  }

  private removeDisabledBlock(): void {
    if (this.disabledBlock) {
      this.controlContainer.removeChild(this.disabledBlock);
      this.disabledBlock = null;
    }
  }
}
