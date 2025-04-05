import { WinnersModel } from '../model';
import { WinnersView } from '../view';

export class WinnersController {
  constructor(
    private readonly model: WinnersModel,
    private readonly view: WinnersView
  ) {
    this.initEventListeners();
  }
  private initEventListeners(): void {
    const tableHeader = this.view.winnersTableHeader;
    tableHeader.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tableButton = target.closest('.table-btn');
        if (!tableButton) {
          return;
        }

        if (target.classList.contains('sort-btn-time')) {
        } else if (target.classList.contains('sort-btn-wins')) {
        }
      }
    });
  }
}
