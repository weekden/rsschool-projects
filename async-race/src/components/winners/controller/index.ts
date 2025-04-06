import { WinnersModel } from '../model';
import { WinnersView } from '../view';
import { WinnerApi } from '../../../API/winnersApi';
import { GarageAPI } from '../../../API/garageAPI';

export class WinnersController {
  constructor(
    private readonly model: WinnersModel,
    private readonly view: WinnersView
  ) {
    this.model.subscribeWinnersListener(() => this.handleModelUpdateWinnersList());
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

  private async loadWinners(page: number = 1, limit: number = 10): Promise<void> {
    try {
      const { winners, totalCount } = await WinnerApi.getWinnersPage({ page: page, limit: limit });
      console.log({ winners, totalCount });
      await Promise.all(
        winners.map(async (winner) => {
          const item = await GarageAPI.getCar(winner.id);
          winner.color = item.color;
          winner.name = item.name;
        })
      );
      this.model.setWinners(winners);
      console.log(winners);
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdateWinnersList(): void {
    console.log(this.model.getWinners());
    this.view.updateWinners();
  }
}
