import { createButton } from '../../../utils/dom/createButton';
import { createInputElement } from '../../../utils/dom/createInputElement';
import { GarageModel } from '../../garage/model';
import { createDataList } from '../../../utils/dom/createDataList';

import { createElement } from '../../../utils/dom/createElement';

export class FormView {
  public createButton: HTMLButtonElement;
  public updateButton: HTMLButtonElement;
  public raceButton: HTMLButtonElement;
  public resetButton: HTMLButtonElement;
  public generateButton: HTMLButtonElement;
  public textInputCreate: HTMLInputElement;
  public colorInputCreate: HTMLInputElement;
  public textInputUpdate: HTMLInputElement;
  public colorInputUpdate: HTMLInputElement;

  constructor(private model: GarageModel) {
    this.createButton = createButton({
      text: 'CREATE',
      classes: ['controll-item', 'controll-item__btn', 'constro-item__btn-create'],
    });

    this.updateButton = createButton({
      text: 'UPDATE',
      classes: ['controll-item', 'controll-item__btn', 'constro-item__btn-update'],
    });

    this.textInputCreate = createInputElement({
      type: 'text',
      id: 'createCar-input',
      list: 'car-list',
      classes: ['controll-item', 'controll-item__input', 'constro-item__input-text'],
    });

    this.colorInputCreate = createInputElement({
      type: 'color',
      value: '#ffffff',
      classes: ['controll-item', 'controll-item__input', 'constro-item__input-color'],
    });

    this.textInputUpdate = createInputElement({
      type: 'text',
      classes: ['controll-item', 'controll-item__input', 'constro-item__input-text'],
    });

    this.colorInputUpdate = createInputElement({
      type: 'color',
      value: '#ffffff',
      classes: ['controll-item', 'controll-item__input', 'constro-item__input-color'],
    });

    this.raceButton = createButton({
      text: 'RACE',
      classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
    });

    this.resetButton = createButton({
      text: 'RESET',
      classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
    });

    this.generateButton = createButton({
      text: 'GENERATE CAR',
      classes: ['controll-item', 'controll-item__btn', 'controll-item__btn-state'],
    });
  }

  public updateUpdatesInputs(): void {
    const car = this.model.getCarToEdit();
    if (!car) return;
    console.log(car);

    this.textInputUpdate.value = car?.name;
    this.colorInputUpdate.value = car?.color;
    this.textInputUpdate.focus();
  }

  public updateControlButtons(): void {
    const raceState = this.model.getRaceState();
    if (raceState) {
      this.raceButton.disabled = true;
      // this.resetButton.disabled = true;
    } else {
      this.raceButton.disabled = false;
      // this.resetButton.disabled = false;
    }
  }

  public render(): HTMLElement {
    const formContainer = createElement({ tag: 'div', classes: ['form'] });
    const carList = this.model.carList;
    const dataListId = this.textInputCreate.getAttribute('list');

    let createItem: HTMLElement | null = null;

    if (dataListId) {
      const dataList = createDataList(carList, dataListId);

      createItem = createElement({
        tag: 'div',
        classes: ['controll', 'controll-wrapper', 'controll-wrapper__create'],
        children: [this.textInputCreate, this.colorInputCreate, this.createButton],
      });

      formContainer.append(dataList);
    }

    const updateItem = createElement({
      tag: 'div',
      classes: ['controll', 'controll-wrapper', 'controll-wrapper__update'],
      children: [this.textInputUpdate, this.colorInputUpdate, this.updateButton],
    });

    const stateItem = createElement({
      tag: 'div',
      classes: ['controll-item'],
      children: [this.raceButton, this.resetButton, this.generateButton],
    });
    if (createItem instanceof HTMLElement) {
      formContainer.append(createItem, updateItem, stateItem);
    }
    return formContainer;
  }
}
