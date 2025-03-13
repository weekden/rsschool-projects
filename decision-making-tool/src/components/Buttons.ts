import { createButton } from '../utils/createButton';
import { LSControl } from '../utils/lsControl';
import { createModal } from '../utils/createModal';
import { createTextArea } from '../utils/createTextArea';
import { parseValueFromTextArea } from '../utils/createTextArea';
import type { TodoList } from './List';

export class Buttons {
  private readonly buttonsContainer: HTMLDivElement;

  constructor(private readonly todoList: TodoList) {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('buttons-container');
  }

  public render(): HTMLDivElement {
    const addButton = createButton('Add Option', () => {
      this.todoList.addTodo();
    });
    const pasteButton = createButton('Paste List', () => {
      createModal({
        content: createTextArea(),
        buttons: [
          {
            text: 'Cancel',
            onClick: (modal): void => {
              if (modal) {
                modal.remove();
              }
            },
          },
          {
            text: 'Confirm',
            onClick: (modal, content): void => {
              if (content instanceof HTMLTextAreaElement) {
                const textValue = content.value;
                const listItemObject = parseValueFromTextArea(textValue, LSControl.getState().counter);
                listItemObject.items.forEach((item) => this.todoList.addTodo(item));

                modal.remove();
              }
            },
          },
        ],
      });
    });
    const clearButton = createButton('Clear List', () => {
      this.todoList.clearTodoList();
      LSControl.clearTodo();
    });
    const saveButton = createButton('Save List to File', () => {});
    const loadButton = createButton('Load List from File', () => {});
    const startButton = createButton('Start', () => {});

    const saveLoadContainer = document.createElement('div');
    saveLoadContainer.append(saveButton, loadButton);

    this.buttonsContainer.append(addButton, pasteButton, clearButton, saveLoadContainer, startButton);

    return this.buttonsContainer;
  }
}
