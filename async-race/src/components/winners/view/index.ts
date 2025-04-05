import { WinnersModel } from '../model';
import { createSortableHeaderCell } from '../items';

import type { WinnerItem } from '../../../types';

export class WinnersView {
  private winnersTable: HTMLTableElement;
  private winnersTableBody: HTMLElement;

  constructor(private readonly model: WinnersModel) {
    this.winnersTable = document.createElement('table');
    this.winnersTableBody = document.createElement('tbody');
    this.winnersTable.append(this.winnersTableBody);
    this.createTable();
  }

  public render(): HTMLElement {
    return this.winnersTable;
  }

  public updateWinners(winners: Required<WinnerItem>[]): void {
    if (!winners) return;
    winners.forEach((item, index) => {
      const tableRow = document.createElement('tr');

      const numberCell = document.createElement('td');
      numberCell.textContent = (index + 1).toString();

      const carIconCell = document.createElement('td');
      carIconCell.textContent = item.color;

      const nameCell = document.createElement('td');
      nameCell.textContent = item.name;

      const winsCell = document.createElement('td');
      winsCell.textContent = item.wins.toString();

      const bestTimeCell = document.createElement('td');
      bestTimeCell.textContent = item.time.toFixed(2);

      tableRow.append(numberCell, carIconCell, nameCell, winsCell, bestTimeCell);

      this.winnersTableBody.appendChild(tableRow);
    });
  }

  private createTable(): void {
    const headers = [
      { title: 'Number', keyClass: 'number' },
      { title: 'Car', keyClass: 'car' },
      { title: 'Name', keyClass: 'name' },
      { title: 'Wins', keyClass: 'wins' },
      { title: 'Best time (seconds)', keyClass: 'time' },
    ];

    const tHead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach((item) => {
      const th = createSortableHeaderCell(item.title, item.keyClass);
      headerRow.appendChild(th);
    });

    tHead.append(headerRow);
    this.winnersTable.prepend(tHead);
  }
}
