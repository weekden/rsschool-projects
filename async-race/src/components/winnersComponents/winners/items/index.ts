export function createSortableHeaderCell(title: string, keyClass: string): HTMLTableCellElement {
  const th = document.createElement('th');

  const button = document.createElement('button');
  button.classList.add('table-btn', `sort-btn-${keyClass}`);
  button.setAttribute('data-sort', keyClass);
  button.textContent = title;

  const arrow = document.createElement('span');
  arrow.classList.add('pointer');
  arrow.textContent = '';

  button.appendChild(arrow);
  th.appendChild(button);

  return th;
}
