import type { WinnerItem, WinnersTypeSort, WinnersTypeOrder } from '../../../types';

export class WinnersModel {
  private readonly coinCarsAtPage: number = 10;

  private winners: WinnerItem[] = Array.from({ length: this.coinCarsAtPage });
  private sortParams: { column: WinnersTypeSort; order: WinnersTypeOrder } = {
    column: 'id',
    order: 'ASC',
  };

  private winnersListeners: (() => void)[] = [];

  public setWinners(winners: WinnerItem[]): void {
    if (this.winners.length > this.coinCarsAtPage) {
      this.winners = winners.slice(0, this.coinCarsAtPage);
    } else {
      this.winners = winners;
    }
    this.notifyWinnersListener();
  }

  public getSortParams(): { column: WinnersTypeSort; order: WinnersTypeOrder } {
    return this.sortParams;
  }

  public setSortParams(column: WinnersTypeSort): void {
    this.sortParams = {
      column,
      order: this.sortParams.column === column && this.sortParams.order === 'ASC' ? 'DESC' : 'ASC',
    };
  }

  public getWinners(): WinnerItem[] {
    return this.winners;
  }

  public subscribeWinnersListener(callback: () => void): void {
    this.winnersListeners.push(callback);
  }

  private notifyWinnersListener(): void {
    this.winnersListeners.forEach((callback) => callback());
  }
}
