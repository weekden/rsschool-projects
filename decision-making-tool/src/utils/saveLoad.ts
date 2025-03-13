export const saveFile = (text: string): void => {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'todo-list.json';
  link.click();
};

export const loadFile = (callback: (data: string) => void): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.addEventListener('change', (event) => {
    const cellElement = event.target;
    if (cellElement instanceof HTMLInputElement && cellElement.files) {
      const file = cellElement.files[0];

      const reader = new FileReader();
      reader.onload = (): void => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsText(file);
    }
  });
  input.click();
};
