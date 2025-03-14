export const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'button';
  button.addEventListener('click', onClick);
  return button;
};
