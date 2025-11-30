import type { WinnerItem, WinnersTypeSort, WinnersTypeOrder } from '../types';

export class WinnersModel {
  private coinWinners: number = 0;

  private winners: WinnerItem[] = [];
  private sortParams: { column: WinnersTypeSort; order: WinnersTypeOrder } = {
    column: 'id',
    order: 'ASC',
  };

  private winnersListeners: (() => void)[] = [];

  public setWinners(winners: WinnerItem[]): void {
    this.winners = winners;
    this.notifyWinnersListener();
  }

  public getWinners(): WinnerItem[] {
    return this.winners;
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

  public setWinnersCount(coin: number): void {
    this.coinWinners = coin;
    this.notifyWinnersListener();
  }

  public getWinnersCount(): number {
    return this.coinWinners;
  }

  public subscribeWinnersListener(callback: () => void): void {
    this.winnersListeners.push(callback);
  }

  private notifyWinnersListener(): void {
    this.winnersListeners.forEach((callback) => callback());
  }
}
