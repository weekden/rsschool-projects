import { createButton } from '../utils/createButton';

export class Buttons {
  private readonly buttonsContainer: HTMLDivElement;

  constructor() {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('buttons-container');
  }

  public render(): HTMLDivElement {
    const addButton = createButton('Add Option', () => {});
    const pasteButton = createButton('Paste List', () => {});
    const clearButton = createButton('Clear List', () => {});
    const saveButton = createButton('Save List to File', () => {});
    const loadButton = createButton('Load List from File', () => {});
    const startButton = createButton('Start', () => {});

    const saveLoadContainer = document.createElement('div');
    saveLoadContainer.append(saveButton, loadButton);

    this.buttonsContainer.append(addButton, pasteButton, clearButton, saveLoadContainer, startButton);

    return this.buttonsContainer;
  }
}
