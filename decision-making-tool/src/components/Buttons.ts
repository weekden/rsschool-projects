import { createButton } from '../utils/dom/createButton';
import { LSControl } from '../utils/lsControl';
import { createPopup } from '../utils/dom/createPopup';
import { createTextArea } from '../utils/dom/createTextArea';
import { parseValueFromTextArea } from '../utils/dom/createTextArea';
import type { TodoList } from './List';
import { loadFile, saveFile } from '../utils/saveLoad';

export class Buttons {
  private readonly buttonsContainer: HTMLDivElement;

  constructor(private readonly todoList: TodoList) {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('buttons-container');
  }

  public render(): HTMLDivElement {
    const addButton = createButton('Add Option', () => {
      this.todoList.addLi();
    });
    const pasteButton = createButton('Paste List', () => {
      createPopup({
        content: createTextArea(),
        buttons: [
          {
            text: 'Cancel',
            onClick: (popup): void => {
              if (popup) {
                popup.remove();
              }
            },
          },
          {
            text: 'Confirm',
            onClick: (popup, content): void => {
              if (content instanceof HTMLTextAreaElement) {
                const textValue = content.value;
                const listItemObject = parseValueFromTextArea(textValue, LSControl.getState().counter);
                listItemObject.items.forEach((item) => this.todoList.addLi(item));
                popup.remove();
              }
            },
          },
        ],
      });
    });
    const clearButton = createButton('Clear List', () => {
      this.todoList.clearUl();
      LSControl.clearItems();
    });
    const saveButton = createButton('Save List to File', () => {
      const fileToString = JSON.stringify(LSControl.getState());
      saveFile(fileToString);
    });
    const loadButton = createButton('Load List from File', () => {
      loadFile((data: string) => {
        this.todoList.clearUl();
        LSControl.saveState(JSON.parse(data));
        this.todoList.items = LSControl.getState().items;
        this.todoList.idCounter = LSControl.getState().counter;
        this.todoList.renderFromStorage();
      });
    });
    const startButton = createButton('Start', () => {
      const listForRender = LSControl.getListForRender();

      if (listForRender.length < 2) {
        createPopup({
          content: `Please add at least 2 valid options.

        An option is considered valid if its title is not empty and its weight is greater than 0
        `,
          buttons: [
            {
              text: 'Cancel',
              onClick: (popup): void => {
                if (popup) {
                  popup.remove();
                }
              },
            },
          ],
        });
      } else {
        location.href = '#/decision-picker';
        // console.log(listForRender);
      }
    });

    const saveLoadContainer = document.createElement('div');
    saveLoadContainer.append(saveButton, loadButton);

    this.buttonsContainer.append(addButton, pasteButton, clearButton, saveLoadContainer, startButton);

    return this.buttonsContainer;
  }
}
