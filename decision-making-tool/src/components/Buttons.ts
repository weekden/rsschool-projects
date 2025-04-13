import { createButton } from '../utils/dom/createButton';
import { LSControl } from '../utils/storage/lsControl';
import { createPopup } from '../utils/dom/createPopup';
import { createTextArea, parseValueFromTextArea } from '../utils/dom/createTextArea';
import type { TodoList } from './List';
import { loadFile, saveFile } from '../utils/storage/saveLoad';

export class Buttons {
  private readonly buttonsContainer: HTMLDivElement;

  constructor(private readonly todoList: TodoList) {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('buttons-container');
  }

  public render(): HTMLDivElement {
    const saveLoadContainer = document.createElement('div');
    saveLoadContainer.append(this.createSaveButton(), this.createLoadButton());

    this.buttonsContainer.append(
      this.createAddButton(),
      this.createPasteButton(),
      this.createClearButton(),
      saveLoadContainer,
      this.createStartButton()
    );

    return this.buttonsContainer;
  }

  private createAddButton = (): HTMLButtonElement => createButton('Add Option', () => this.todoList.addLi());

  private createClearButton = (): HTMLButtonElement =>
    createButton('Clear List', () => {
      this.todoList.clearUl();
      LSControl.clearItems();
    });

  private createSaveButton = (): HTMLButtonElement =>
    createButton('Save List to File', () => {
      saveFile(JSON.stringify(LSControl.getState()));
    });

  private createLoadButton = (): HTMLButtonElement =>
    createButton('Load List from File', () => {
      loadFile((data: string) => {
        this.todoList.clearUl();
        LSControl.saveState(JSON.parse(data));
        this.todoList.items = LSControl.getState().items;
        this.todoList.idCounter = LSControl.getState().counter;
        this.todoList.renderFromStorage();
      });
    });

  private createPasteButton = (): HTMLButtonElement =>
    createButton('Paste List', () => {
      createPopup({
        content: createTextArea(),
        buttons: [
          { text: 'Cancel', onClick: (popup): void => popup?.remove() },
          {
            text: 'Confirm',
            onClick: (popup, content): void => {
              if (content instanceof HTMLTextAreaElement) {
                const parsed = parseValueFromTextArea(content.value, LSControl.getState().counter);
                parsed.items.forEach((item) => this.todoList.addLi(item));
                popup.remove();
              }
            },
          },
        ],
      });
    });

  private createStartButton = (): HTMLButtonElement =>
    createButton('Start', () => {
      const list = LSControl.getListForRender();
      if (list.length < 2) {
        createPopup({
          content: `Please add at least 2 valid options.

An option is considered valid if its title is not empty and its weight is greater than 0`,
          buttons: [{ text: 'Cancel', onClick: (popup): void => popup?.remove() }],
        });
      } else {
        location.href = '#/decision-picker';
      }
    });
}
