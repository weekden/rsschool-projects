import type { PageName } from '../types';
export class AppModel {
  private pages: Record<PageName, number> = {
    garage: 1,
    winners: 1,
  };
  private trackWidth: number = 0;
  private pagesListener: (() => void)[] = [];

  public setPageNumber(page: PageName, pageNumber: number): void {
    this.pages[page] = pageNumber;
    this.notifyPagesListener();
  }

  public getPageNumber(page: PageName): number {
    return this.pages[page];
  }

  public decreasePageCounter(page: PageName): void {
    this.pages[page]--;
    this.notifyPagesListener();
  }

  public increasePageCounter(page: PageName): void {
    this.pages[page]++;
    this.notifyPagesListener();
  }

  public getTrackWidth(): number {
    return this.trackWidth;
  }

  public setTrackWidth(width: number): void {
    this.trackWidth = width;
  }

  public subscribePagesListener(callback: () => void): void {
    this.pagesListener.push(callback);
  }

  private notifyPagesListener(): void {
    this.pagesListener.forEach((callback) => callback());
  }
}
