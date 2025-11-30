import { AppModel } from '../../../../models/appModel';
import { WinnersModel } from '../../../../models/winnersModel';
import { WinnersView } from '../view';
import { WinnerApi } from '../../../../API/winnersApi';
import { GarageAPI } from '../../../../API/garageAPI';

import { WinnersTypeOrder, WinnersTypeSort } from '../../../../types';

export class WinnersController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel,
    private readonly view: WinnersView
  ) {
    this.model.subscribeWinnersListener(() => this.handleModelUpdateWinnersList());
    this.appModel.subscribePagesListener(() => this.loadWinners());
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

        let typeSort: WinnersTypeSort | undefined;

        if (target.classList.contains('sort-btn-time')) {
          typeSort = 'time';
        } else if (target.classList.contains('sort-btn-wins')) {
          typeSort = 'wins';
        } else if (target.classList.contains('sort-btn-number')) {
          typeSort = 'id';
        }

        if (typeSort) {
          this.model.setSortParams(typeSort);
          this.view.updateHeaderButton(tableButton);

          const currentPage = this.appModel.getPageNumber('winners');
          const parameterSort = this.model.getSortParams();

          if (currentPage === 1) {
            this.loadWinners(1, 10, parameterSort.column, parameterSort.order);
          } else {
            this.appModel.setPageNumber('winners', 1);
          }
        }
      }
    });
  }

  private async loadWinners(
    page: number = this.appModel.getPageNumber('winners'),
    limit: number = 10,
    sort: WinnersTypeSort = this.model.getSortParams().column,
    order: WinnersTypeOrder = this.model.getSortParams().order
  ): Promise<void> {
    try {
      const { winners, totalCount } = await WinnerApi.getWinnersPage({
        page,
        limit,
        sort,
        order,
      });
      await Promise.all(
        winners.map(async (winner) => {
          const item = await GarageAPI.getCar(winner.id);
          winner.color = item.color;
          winner.name = item.name;
        })
      );
      this.model.setWinners(winners);
      this.model.setWinnersCount(totalCount);
    } catch (error) {
      console.error(error);
    }
  }

  private handleModelUpdateWinnersList(): void {
    this.view.updateWinners();
  }
}
