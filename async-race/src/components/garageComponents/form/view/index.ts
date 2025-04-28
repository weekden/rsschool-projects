import { createButton } from '../../../../utils/dom/createButton';
import { createInputElement } from '../../../../utils/dom/createInputElement';
import { GarageModel } from '../../../../models/garageModel';
import { createDataList } from '../../../../utils/dom/createDataList';

import { createElement } from '../../../../utils/dom/createElement';

export class FormView {
  public formContainer: HTMLElement;
  public createButton: HTMLButtonElement | null = null;
  public updateButton: HTMLButtonElement | null = null;
  public raceButton: HTMLButtonElement | null = null;
  public resetButton: HTMLButtonElement | null = null;
  public generateButton: HTMLButtonElement | null = null;
  public textInputCreate: HTMLInputElement | null = null;
  public colorInputCreate: HTMLInputElement | null = null;
  public textInputUpdate: HTMLInputElement | null = null;
  public colorInputUpdate: HTMLInputElement | null = null;

  constructor(private model: GarageModel) {
    this.formContainer = createElement({ tag: 'div', classes: ['form'] });
    this.inputsInit();
    this.buttonsInit();
  }

  public render(): HTMLElement {
    const carList = this.model.carList;
    const dataListId = this.textInputCreate?.getAttribute('list');

    if (dataListId) {
      const dataList = createDataList(carList, dataListId);
      this.formContainer.append(dataList);
    }

    const createItem = this.createCreateItem();
    const updateItem = this.createUpdateItem();
    const stateItem = this.createStateItem();
    if (createItem && updateItem && stateItem) {
      this.formContainer.append(createItem, updateItem, stateItem);
    }
    return this.formContainer;
  }

  public clearInputs(): void {
    if (!this.textInputCreate || !this.colorInputCreate || !this.textInputUpdate || !this.colorInputUpdate) {
      return;
    }
    this.textInputCreate.value = '';
    this.colorInputCreate.value = '#ffffff';
    this.textInputUpdate.value = '';
    this.colorInputUpdate.value = '#ffffff';
  }

  public updateUpdatesInputs(): void {
    const car = this.model.getCarToEdit();
    const updateContainer = this.formContainer.children[2];
    if (!car || !this.textInputUpdate || !this.colorInputUpdate) {
      return;
    }

    this.textInputUpdate.value = car.name;
    this.colorInputUpdate.value = car.color;
    this.textInputUpdate.focus();
    updateContainer.classList.remove('disabled');
  }

  public updateControlButtons(): void {
    if (!this.raceButton) {
      return;
    }
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

  private createCreateItem(): HTMLElement | undefined {
    if (!this.textInputCreate || !this.colorInputCreate || !this.createButton) {
      return;
    }
    return createElement({
      tag: 'div',
      classes: ['controll', 'controll-wrapper', 'controll-wrapper__create'],
      children: [this.textInputCreate, this.colorInputCreate, this.createButton],
    });
  }

  private createUpdateItem(): HTMLElement | undefined {
    if (!this.textInputUpdate || !this.colorInputUpdate || !this.updateButton) {
      return;
    }
    return createElement({
      tag: 'div',
      classes: ['controll', 'controll-wrapper', 'controll-wrapper__update', 'disabled'],
      children: [this.textInputUpdate, this.colorInputUpdate, this.updateButton],
    });
  }

  private createStateItem(): HTMLElement | undefined {
    if (!this.raceButton || !this.resetButton || !this.generateButton) {
      return;
    }
    return createElement({
      tag: 'div',
      classes: ['controll-item'],
      children: [this.raceButton, this.resetButton, this.generateButton],
    });
  }

  private inputsInit(): void {
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
  }
  private buttonsInit(): void {
    this.createButton = createButton({
      text: 'CREATE',
      classes: ['controll-item', 'controll-item__btn', 'constro-item__btn-create'],
    });

    this.updateButton = createButton({
      text: 'UPDATE',
      classes: ['controll-item', 'controll-item__btn', 'constro-item__btn-update'],
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
}
