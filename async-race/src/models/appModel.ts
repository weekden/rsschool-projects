export class AppModel {
  private page: number = 1;
  private pagesListener: (() => void)[] = [];

  public setPageNumber(_page: number): void {
    this.page = _page;
  }

  public getPageNumber(): number {
    return this.page;
  }

  public decreasePageCounter(): void {
    this.page--;
    this.notifyPagesListener();
  }

  public increasePageCounter(): void {
    this.page++;
    this.notifyPagesListener();
  }

  public subscribePagesListener(callback: () => void): void {
    this.pagesListener.push(callback);
  }

  private notifyPagesListener(): void {
    this.pagesListener.forEach((callback) => callback());
  }
}
