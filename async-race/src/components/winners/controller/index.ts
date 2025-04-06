import { WinnersModel } from '../model';
import { WinnersView } from '../view';
import { WinnerApi } from '../../../API/winnersApi';

export class WinnersController {
  constructor(
    private readonly model: WinnersModel,
    private readonly view: WinnersView
  ) {
    this.initEventListeners();
    this.loadWinners();
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
          this.view.updateHeaderButton(tableButton);
        } else if (target.classList.contains('sort-btn-wins')) {
        } else if (target.classList.contains('sort-btn-number')) {
        }
      }
    });
  }

  private async loadWinners(page: number = 1, limit: number = 7): Promise<void> {
    try {
      const { winners, totalCount } = await WinnerApi.getWinnersPage({ page: page, limit: limit });
      console.log(winners);
      console.log(totalCount);
    } catch (error) {
      console.error(error);
    }
  }
}
