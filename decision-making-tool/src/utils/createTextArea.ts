import type { TodoState } from '../types/todo-type';
import type { Todo } from '../types/todo-type';
export const createTextArea = (): HTMLTextAreaElement => {
  const textArea = document.createElement('textarea');
  textArea.placeholder = `Paste a list of new options in a CSV-like format:

    title,1                 -> | title                 | 1 |
    title with whitespace,2 -> | title with whitespace | 2 |
    title , with , commas,3 -> | title , with , commas | 3 |
    title with &quot;quotes&quot;,4   -> | title with &quot;quotes&quot;   | 4 |`;
  return textArea;
};

export const parseValueFromTextArea = (text: string, currentCounter: number): TodoState => {
  const inputTextArray = text.trim().split('\n');
  const items: Todo[] = [];
  const counter = currentCounter + items.length;
  inputTextArray.forEach((item, index) => {
    const id = `#${currentCounter + index + 1}`;
    const weight = item.slice(item.lastIndexOf(',') + 1).trim();
    const title = item.slice(0, item.lastIndexOf(','));
    items.push({ id, title, weight });
  });
  return { items, counter };
};
