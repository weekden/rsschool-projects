import { createButton } from '../../../../utils/dom/createButton';
import { createInputElement } from '../../../../utils/dom/createInputElement';
import { GarageModel } from '../../../../models/garageModel';
import { createDataList } from '../../../../utils/dom/createDataList';

import { createElement } from '../../../../utils/dom/createElement';

export class FormView {
  public formContainer: HTMLElement;
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
    this.formContainer = createElement({ tag: 'div', classes: ['form'] });

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
    const updateContainer = this.formContainer.children[2];
    if (!car) return;

    this.textInputUpdate.value = car?.name;
    this.colorInputUpdate.value = car?.color;
    this.textInputUpdate.focus();
    updateContainer.classList.remove('disabled');
  }

  public updateControlButtons(): void {
    const raceState = this.model.getTotalRaceState();
    if (raceState) {
      this.raceButton.disabled = true;
    } else {
      this.raceButton.disabled = false;
    }
  }

  public enableDisabledUpdateInputs(): void {
    const updateContainer = this.formContainer.children[2];
    updateContainer.classList.add('disabled');
  }

  public render(): HTMLElement {
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

      this.formContainer.append(dataList);
    }

    const updateItem = createElement({
      tag: 'div',
      classes: ['controll', 'controll-wrapper', 'controll-wrapper__update', 'disabled'],
      children: [this.textInputUpdate, this.colorInputUpdate, this.updateButton],
    });

    const stateItem = createElement({
      tag: 'div',
      classes: ['controll-item'],
      children: [this.raceButton, this.resetButton, this.generateButton],
    });
    if (createItem instanceof HTMLElement) {
      this.formContainer.append(createItem, updateItem, stateItem);
    }
    return this.formContainer;
  }
}
