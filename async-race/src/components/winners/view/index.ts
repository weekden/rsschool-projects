import { WinnersModel } from '../model';
import { createSortableHeaderCell } from '../items';

export class WinnersView {
  public readonly winnersTableHeader: HTMLTableCaptionElement;
  private winnersTable: HTMLTableElement;
  private winnersTableBody: HTMLElement;

  constructor(private readonly model: WinnersModel) {
    this.winnersTable = document.createElement('table');
    this.winnersTableHeader = document.createElement('thead');
    this.winnersTableBody = document.createElement('tbody');
    this.winnersTable.append(this.winnersTableBody);
    this.createTable();
  }

  public render(): HTMLElement {
    return this.winnersTable;
  }

  public updateWinners(): void {
    const winners = this.model.getWinners();
    winners.forEach((item, index) => {
      const tableRow = document.createElement('tr');

      const numberCell = document.createElement('td');
      numberCell.textContent = (index + 1).toString();

      const carIconCell = document.createElement('td');
      if (item.color) {
        carIconCell.textContent = item.color;
      }

      const nameCell = document.createElement('td');
      if (item.name) {
        nameCell.textContent = item.name;
      }

      const winsCell = document.createElement('td');
      if (item.wins) {
        winsCell.textContent = item.wins.toString();
      }

      const bestTimeCell = document.createElement('td');
      bestTimeCell.textContent = (item.time / 1000).toFixed(2);

      tableRow.append(numberCell, carIconCell, nameCell, winsCell, bestTimeCell);

      this.winnersTableBody.appendChild(tableRow);
    });
  }

  public updateHeaderButton(button: Element): void {
    console.log(button);
    const pointer = button?.lastChild;
    console.log(pointer);
    if (!pointer) return;
    pointer.textContent = pointer.textContent === '\u25B2' ? '\u25BC' : '\u25B2';
  }

  private createTable(): void {
    const headers = [
      { title: 'Number', keyClass: 'number' },
      { title: 'Car', keyClass: 'car' },
      { title: 'Name', keyClass: 'name' },
      { title: 'Wins', keyClass: 'wins' },
      { title: 'Best time (seconds)', keyClass: 'time' },
    ];

    const headerRow = document.createElement('tr');

    headers.forEach((item) => {
      const th = createSortableHeaderCell(item.title, item.keyClass);
      headerRow.appendChild(th);
    });

    this.winnersTableHeader.append(headerRow);
    this.winnersTable.prepend(this.winnersTableHeader);
  }
}
